import React, { PureComponent } from 'react';
import G2 from 'g2';
import equal from '../equal';

const { Shape } = G2;

const primaryColor = '#2F9CFF';
const backgroundColor = '#F0F2F5';

/* eslint no-underscore-dangle: 0 */
class Gauge extends PureComponent {
  componentDidMount() {
    setTimeout(() => {
      this.renderChart();
    }, 10);
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(this.props, nextProps)) {
      setTimeout(() => {
        this.renderChart(nextProps);
      }, 10);
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

  initChart(nextProps) {
    const { title, color = primaryColor } = nextProps || this.props;

    Shape.registShape('point', 'dashBoard', {
      drawShape(cfg, group) {
        const originPoint = cfg.points[0];
        const point = this.parsePoint({ x: originPoint.x, y: 0.4 });

        const center = this.parsePoint({
          x: 0,
          y: 0,
        });

        const shape = group.addShape('polygon', {
          attrs: {
            points: [
              [center.x, center.y],
              [point.x + 8, point.y],
              [point.x + 8, point.y - 2],
              [center.x, center.y - 2],
            ],
            radius: 2,
            lineWidth: 2,
            arrow: false,
            fill: color,
          },
        });

        group.addShape('Marker', {
          attrs: {
            symbol: 'circle',
            lineWidth: 2,
            fill: color,
            radius: 8,
            x: center.x,
            y: center.y,
          },
        });
        group.addShape('Marker', {
          attrs: {
            symbol: 'circle',
            lineWidth: 2,
            fill: '#fff',
            radius: 5,
            x: center.x,
            y: center.y,
          },
        });

        const { origin } = cfg;
        group.addShape('text', {
          attrs: {
            x: center.x,
            y: center.y + 80,
            text: `${origin._origin.value}%`,
            textAlign: 'center',
            fontSize: 24,
            fill: 'rgba(0, 0, 0, 0.85)',
          },
        });
        group.addShape('text', {
          attrs: {
            x: center.x,
            y: center.y + 45,
            text: title,
            textAlign: 'center',
            fontSize: 14,
            fill: 'rgba(0, 0, 0, 0.43)',
          },
        });

        return shape;
      },
    });
  }

  renderChart(nextProps) {
    const {
      height, color = primaryColor, bgColor = backgroundColor, title, percent, format,
    } = nextProps || this.props;
    const data = [{ name: title, value: percent }];

    if (this.chart) {
      this.chart.clear();
    }
    if (this.node) {
      this.node.innerHTML = '';
    }

    this.initChart(nextProps);

    const chart = new G2.Chart({
      container: this.node,
      forceFit: true,
      height,
      animate: false,
      plotCfg: {
        margin: [10, 10, 30, 10],
      },
    });

    chart.source(data);

    chart.tooltip(false);

    chart.coord('gauge', {
      startAngle: -1.2 * Math.PI,
      endAngle: 0.20 * Math.PI,
    });
    chart.col('value', {
      type: 'linear',
      nice: true,
      min: 0,
      max: 100,
      tickCount: 6,
    });
    chart.axis('value', {
      subTick: false,
      tickLine: {
        stroke: color,
        lineWidth: 2,
        value: -14,
      },
      labelOffset: -12,
      formatter: format,
    });
    chart.point().position('value').shape('dashBoard');
    draw(data);

    /* eslint no-shadow: 0 */
    function draw(data) {
      const val = data[0].value;
      const lineWidth = 12;
      chart.guide().clear();

      chart.guide().arc(() => {
        return [0, 0.95];
      }, () => {
        return [val, 0.95];
      }, {
        stroke: color,
        lineWidth,
      });

      chart.guide().arc(() => {
        return [val, 0.95];
      }, (arg) => {
        return [arg.max, 0.95];
      }, {
        stroke: bgColor,
        lineWidth,
      });

      chart.changeData(data);
    }

    this.chart = chart;
  }

  render() {
    return (
      <div ref={this.handleRef} />
    );
  }
}

export default Gauge;
