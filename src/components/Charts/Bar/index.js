import React, { PureComponent } from 'react';
import G2 from 'g2';
import equal from '../equal';
import styles from '../index.less';

class Bar extends PureComponent {
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
    const { height = 0, fit = true, color = 'rgba(24, 144, 255, 0.85)', margin = [32, 0, 32, 40] } = this.props;

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    this.node.innerHTML = '';

    const { Frame } = G2;
    const frame = new Frame(data);

    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height: height - 22,
      legend: null,
      plotCfg: {
        margin,
      },
    });

    chart.axis('x', {
      title: false,
    });
    chart.axis('y', {
      title: false,
      line: false,
      tickLine: false,
    });

    chart.source(frame, {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    });

    chart.tooltip({
      title: null,
      crosshairs: false,
      map: {
        name: 'x',
      },
    });
    chart.interval().position('x*y').color(color).style({
      fillOpacity: 1,
    });
    chart.render();

    this.chart = chart;
  }

  render() {
    const { height, title } = this.props;

    return (
      <div className={styles.chart} style={{ height }}>
        <div>
          { title && <h4>{title}</h4>}
          <div ref={this.handleRef} />
        </div>
      </div>
    );
  }
}

export default Bar;
