import React, { Component } from 'react';
import G2 from 'g2';
import { Divider } from 'antd';
import classNames from 'classnames';
import ReactFitText from 'react-fittext';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import equal from '../equal';
import styles from './index.less';

/* eslint react/no-danger:0 */
class Pie extends Component {
  state = {
    legendData: [],
    legendBlock: true,
  };

  componentDidMount() {
    this.renderChart();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(this.props, nextProps)) {
      this.renderChart(nextProps.data);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    if (this.chart) {
      this.chart.destroy();
    }
    this.resize.cancel();
  }

  @Bind()
  @Debounce(300)
  resize() {
    const { hasLegend } = this.props;
    if (!hasLegend || !this.root) {
      window.removeEventListener('resize', this.resize);
      return;
    }
    if (this.root.parentNode.clientWidth <= 380) {
      if (!this.state.legendBlock) {
        this.setState({
          legendBlock: true,
        }, () => {
          this.renderChart();
        });
      }
    } else if (this.state.legendBlock) {
      this.setState({
        legendBlock: false,
      }, () => {
        this.renderChart();
      });
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  handleRoot = (n) => {
    this.root = n;
  }

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    legendData[i] = newItem;

    if (this.chart) {
      const filterItem = legendData.filter(l => l.checked).map(l => l.x);
      this.chart.filter('x', filterItem);
      this.chart.repaint();
    }

    this.setState({
      legendData,
    });
  }

  renderChart(d) {
    let data = d || this.props.data;

    const {
      height = 0,
      hasLegend,
      fit = true,
      margin = [12, 0, 12, 0], percent, color,
      inner = 0.75,
      animate = true,
      colors,
      lineWidth = 0,
    } = this.props;

    const defaultColors = colors;

    let selected = this.props.selected || true;
    let tooltip = this.props.tooltips || true;

    let formatColor;
    if (percent) {
      selected = false;
      tooltip = false;
      formatColor = (value) => {
        if (value === '占比') {
          return color || 'rgba(24, 144, 255, 0.85)';
        } else {
          return '#F0F2F5';
        }
      };

      /* eslint no-param-reassign: */
      data = [
        {
          x: '占比',
          y: parseFloat(percent),
        },
        {
          x: '反比',
          y: 100 - parseFloat(percent),
        },
      ];
    }

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    this.node.innerHTML = '';

    const { Stat } = G2;

    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height,
      plotCfg: {
        margin,
      },
      animate,
    });

    if (!tooltip) {
      chart.tooltip(false);
    } else {
      chart.tooltip({
        title: null,
      });
    }

    chart.axis(false);
    chart.legend(false);

    chart.source(data, {
      x: {
        type: 'cat',
        range: [0, 1],
      },
      y: {
        min: 0,
      },
    });

    chart.coord('theta', {
      inner,
    });

    chart
      .intervalStack()
      .position(Stat.summary.percent('y'))
      .style({ lineWidth, stroke: '#fff' })
      .color('x', percent ? formatColor : defaultColors)
      .selected(selected);

    chart.render();

    this.chart = chart;

    let legendData = [];
    if (hasLegend) {
      const geom = chart.getGeoms()[0]; // 获取所有的图形
      const items = geom.getData(); // 获取图形对应的数据
      legendData = items.map((item) => {
        /* eslint no-underscore-dangle:0 */
        const origin = item._origin;
        origin.color = item.color;
        origin.checked = true;
        return origin;
      });
    }

    this.setState({
      legendData,
    });
  }

  render() {
    const { valueFormat, subTitle, total, hasLegend, className, style } = this.props;
    const { legendData, legendBlock } = this.state;
    const pieClassName = classNames(styles.pie, className, {
      [styles.hasLegend]: !!hasLegend,
      [styles.legendBlock]: legendBlock,
    });

    return (
      <div ref={this.handleRoot} className={pieClassName} style={style}>
        <ReactFitText maxFontSize={25}>
          <div className={styles.chart}>
            <div ref={this.handleRef} style={{ fontSize: 0 }} />
            {
              (subTitle || total) && (
                <div className={styles.total}>
                  {subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
                  {
                    // eslint-disable-next-line
                    total && <div className="pie-stat" dangerouslySetInnerHTML={{ __html: total }} />
                  }
                </div>
              )
            }
          </div>
        </ReactFitText>

        {
          hasLegend && (
            <ul className={styles.legend}>
              {
                legendData.map((item, i) => (
                  <li key={item.x} onClick={() => this.handleLegendClick(item, i)}>
                    <span className={styles.dot} style={{ backgroundColor: !item.checked ? '#aaa' : item.color }} />
                    <span className={styles.legendTitle}>{item.x}</span>
                    <Divider type="vertical" />
                    <span className={styles.percent}>{`${(item['..percent'] * 100).toFixed(2)}%`}</span>
                    <span
                      className={styles.value}
                      dangerouslySetInnerHTML={{
                        __html: valueFormat ? valueFormat(item.y) : item.y,
                      }}
                    />
                  </li>
                ))
              }
            </ul>
          )
        }
      </div>
    );
  }
}

export default Pie;
