import React, { PureComponent } from 'react';
import G2 from 'g2';
import equal from '../equal';
import styles from '../index.less';

class MiniArea extends PureComponent {
  componentDidMount() {
    this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(this.props, nextProps)) {
      this.renderChart(nextProps.data);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  renderChart(data) {
    const { height = 0, fit = true, color = '#33abfb', line, xAxis, yAxis, animate = true } = this.props;

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    this.node.innerHTML = '';

    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height: height + 54,
      animate,
      plotCfg: {
        margin: [36, 0, 30, 0],
      },
      legend: null,
    });

    if (!xAxis && !yAxis) {
      chart.axis(false);
    }

    if (xAxis) {
      chart.axis('x', xAxis);
    } else {
      chart.axis('x', false);
    }

    if (yAxis) {
      chart.axis('y', yAxis);
    } else {
      chart.axis('y', false);
    }

    chart.source(data, {
      x: {
        type: 'cat',
        range: [0, 1],
        ...xAxis,
      },
      y: {
        min: 0,
        ...yAxis,
      },
    });

    chart.tooltip({
      title: null,
      crosshairs: false,
      map: {
        name: 'x',
      },
    });
    chart.area().position('x*y').color(color).shape('smooth');
    if (line) {
      chart.line().position('x*y').color(color).shape('smooth');
    }
    chart.render();

    this.chart = chart;
  }

  render() {
    const { height } = this.props;

    return (
      <div className={styles.miniChart} style={{ height }}>
        <div>
          <div ref={this.handleRef} />
        </div>
      </div>
    );
  }
}

export default MiniArea;
