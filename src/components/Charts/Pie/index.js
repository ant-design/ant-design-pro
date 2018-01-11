import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Coord } from 'bizcharts';
import { DataView } from '@antv/data-set';
import { Divider } from 'antd';
import classNames from 'classnames';
import ReactFitText from 'react-fittext';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';

import styles from './index.less';

/* eslint react/no-danger:0 */
@autoHeight()
export default class Pie extends Component {
  state = {
    legendData: [],
    legendBlock: false,
  };

  componentDidMount() {
    this.getLengendData();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.getLengendData();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.resize.cancel();
  }

  getG2Instance = (chart) => {
    this.chart = chart;
  };

  // for custom lengend view
  getLengendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    const items = geom.get('dataArray') || []; // 获取图形对应的

    const legendData = items.map((item) => {
      /* eslint no-underscore-dangle:0 */
      const origin = item[0]._origin;
      origin.color = item[0].color;
      origin.checked = true;
      return origin;
    });

    this.setState({
      legendData,
    });
  };

  // for window resize auto responsive legend
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
        });
      }
    } else if (this.state.legendBlock) {
      this.setState({
        legendBlock: false,
      });
    }
  }

  handleRoot = (n) => {
    this.root = n;
  };

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    legendData[i] = newItem;

    const filteredLegendData = legendData.filter(l => l.checked).map(l => l.x);

    if (this.chart) {
      this.chart.filter('x', val => filteredLegendData.indexOf(val) > -1);
    }

    this.setState({
      legendData,
    });
  };

  render() {
    const {
      valueFormat,
      subTitle,
      total,
      hasLegend = false,
      className,
      style,
      height,
      forceFit = true,
      percent = 0,
      color,
      inner = 0.75,
      animate = true,
      colors,
      lineWidth = 1,
    } = this.props;

    const { legendData, legendBlock } = this.state;
    const pieClassName = classNames(styles.pie, className, {
      [styles.hasLegend]: !!hasLegend,
      [styles.legendBlock]: legendBlock,
    });

    const defaultColors = colors;
    let data = this.props.data || [];
    let selected = this.props.selected || true;
    let tooltip = this.props.tooltip || true;
    let formatColor;

    const scale = {
      x: {
        type: 'cat',
        range: [0, 1],
      },
      y: {
        min: 0,
      },
    };

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

    const tooltipFormat = [
      'x*percent',
      (x, p) => ({
        name: x,
        value: `${(p * 100).toFixed(2)}%`,
      }),
    ];

    const padding = [12, 0, 12, 0];

    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'y',
      dimension: 'x',
      as: 'percent',
    });

    return (
      <div ref={this.handleRoot} className={pieClassName} style={style}>
        <ReactFitText maxFontSize={25}>
          <div className={styles.chart}>
            <Chart
              scale={scale}
              height={height}
              forceFit={forceFit}
              data={dv}
              padding={padding}
              animate={animate}
              onGetG2Instance={this.getG2Instance}
            >
              {!!tooltip && <Tooltip showTitle={false} />}
              <Coord type="theta" innerRadius={inner} />
              <Geom
                style={{ lineWidth, stroke: '#fff' }}
                tooltip={tooltip && tooltipFormat}
                type="intervalStack"
                position="percent"
                color={['x', percent ? formatColor : defaultColors]}
                selected={selected}
              />
            </Chart>

            {(subTitle || total) && (
              <div className={styles.total}>
                {subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
                {/* eslint-disable-next-line */}
                {total && <div className="pie-stat" dangerouslySetInnerHTML={{ __html: total }} />}
              </div>
            )}
          </div>
        </ReactFitText>

        {hasLegend && (
          <ul className={styles.legend}>
            {legendData.map((item, i) => (
              <li key={item.x} onClick={() => this.handleLegendClick(item, i)}>
                <span
                  className={styles.dot}
                  style={{ backgroundColor: !item.checked ? '#aaa' : item.color }}
                />
                <span className={styles.legendTitle}>{item.x}</span>
                <Divider type="vertical" />
                <span className={styles.percent}>
                  {`${(isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                </span>
                <span
                  className={styles.value}
                  dangerouslySetInnerHTML={{
                    __html: valueFormat ? valueFormat(item.y) : item.y,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
