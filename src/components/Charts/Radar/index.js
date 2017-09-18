import React, { PureComponent } from 'react';
import G2 from 'g2';
import { Row, Col } from 'antd';
import equal from '../equal';
import styles from './index.less';

/* eslint react/no-danger:0 */
class Radar extends PureComponent {
  state = {
    legendData: [],
  }

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

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const legendData = this.state.legendData;
    legendData[i] = newItem;

    if (this.chart) {
      const filterItem = legendData.filter(l => l.checked).map(l => l.name);
      this.chart.filter('name', filterItem);
      this.chart.repaint();
    }

    this.setState({
      legendData,
    });
  }

  renderChart(data) {
    const { height = 0,
      hasLegend = true,
      fit = true,
      tickCount = 4,
      margin = [16, 0, 16, 0] } = this.props;

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    this.node.innerHTML = '';

    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height: height - 22,
      plotCfg: {
        margin,
      },
    });

    this.chart = chart;

    chart.source(data, {
      value: {
        min: 0,
        tickCount,
      },
    });

    chart.coord('polar');
    chart.legend(false);

    chart.axis('label', {
      line: null,
    });

    chart.axis('value', {
      grid: {
        type: 'polygon',
      },
    });

    chart.line().position('label*value').color('name');
    chart.point().position('label*value').color('name').shape('circle');

    chart.render();

    if (hasLegend) {
      const geom = chart.getGeoms()[0]; // 获取所有的图形
      const items = geom.getData(); // 获取图形对应的数据
      const legendData = items.map((item) => {
        /* eslint no-underscore-dangle:0 */
        const origin = item._origin;
        const result = {
          name: origin[0].name,
          color: item.color,
          checked: true,
          value: origin.reduce((p, n) => p + n.value, 0),
        };

        return result;
      });

      this.setState({
        legendData,
      });
    }
  }

  render() {
    const { height, title, hasLegend } = this.props;
    const { legendData } = this.state;

    return (
      <div className={styles.radar} style={{ height }}>
        <div>
          { title && <h4>{title}</h4>}
          <div ref={this.handleRef} />
          {
            hasLegend && <Row className={styles.legend}>
              {
                legendData.map((item, i) => (
                  <Col
                    span={(24 / legendData.length)}
                    key={item.name}
                    onClick={() => this.handleLegendClick(item, i)}
                  >
                    <div className={styles.legendItem}>
                      <p>
                        <span className={styles.dot} style={{ backgroundColor: !item.checked ? '#aaa' : item.color }} />
                        <span>{item.name}</span>
                      </p>
                      <h6>{item.value}</h6>
                      {
                        i !== (legendData.length - 1) && <div className={styles.split} />
                      }
                    </div>
                  </Col>
                ))
              }
            </Row>
          }
        </div>
      </div>
    );
  }
}

export default Radar;
