import React, { Component } from 'react';
import G2 from 'g2';
import Slider from 'g2-plugin-slider';
import styles from './index.less';

class TimelineChart extends Component {
  componentDidMount() {
    this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderChart(nextProps.data);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.slider) {
      this.slider.destroy();
    }
  }

  sliderId = `timeline-chart-slider-${Math.random() * 1000}`

  handleRef = (n) => {
    this.node = n;
  }

  renderChart(data) {
    const { height = 400, margin = [60, 20, 40, 40], titleMap } = this.props;

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    if (this.sliderId) {
      document.getElementById(this.sliderId).innerHTML = '';
    }
    this.node.innerHTML = '';

    const chart = new G2.Chart({
      container: this.node,
      forceFit: true,
      height,
      plotCfg: {
        margin,
      },
    });

    chart.axis('x', {
      title: false,
    });
    chart.axis('y1', {
      title: false,
    });
    chart.axis('y2', false);

    chart.legend({
      mode: false,
      position: 'top',
    });

    chart.source(data, {
      x: {
        type: 'timeCat',
        tickCount: 16,
        mask: 'HH:MM',
        range: [0, 1],
      },
      y1: {
        alias: titleMap.y1,
        min: 0,
      },
      y2: {
        alias: titleMap.y2,
        min: 0,
      },
    });

    chart.line().position('x*y1').color('#1890FF');
    chart.line().position('x*y2').color('#2FC25B');

    this.chart = chart;

    /* eslint new-cap:0 */
    const slider = new Slider({
      domId: this.sliderId,
      height: 26,
      xDim: 'x',
      yDim: 'y1',
      charts: [chart],
    });
    slider.render();

    this.slider = slider;
  }

  render() {
    const { height, title } = this.props;

    return (
      <div className={styles.timelineChart} style={{ height }}>
        <div>
          { title && <h4>{title}</h4>}
          <div ref={this.handleRef} />
          <div id={this.sliderId} />
        </div>
      </div>
    );
  }
}

export default TimelineChart;
