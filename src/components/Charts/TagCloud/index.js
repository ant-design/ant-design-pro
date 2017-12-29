import React, { Component } from 'react';
import { Chart, Geom, Coord, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import classNames from 'classnames';
import autoHeight from '../autoHeight';
import styles from './index.less';

/* eslint no-underscore-dangle: 0 */
/* eslint no-param-reassign: 0 */

const imgUrl = 'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png';

@autoHeight()
class TagCloud extends Component {
  state = {
    dv: null,
  };

  componentDidMount() {
    this.initTagCloud();
    this.renderChart();
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.renderChart(nextProps);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.renderChart();
  };

  saveRootRef = (node) => {
    this.root = node;
  };

  initTagCloud = () => {
    function getTextAttrs(cfg) {
      return Object.assign(
        {},
        {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic',
        },
        cfg.style
      );
    }

    // 给point注册一个词云的shape
    Shape.registerShape('point', 'cloud', {
      drawShape(cfg, container) {
        const attrs = getTextAttrs(cfg);
        return container.addShape('text', {
          attrs: Object.assign(attrs, {
            x: cfg.x,
            y: cfg.y,
          }),
        });
      },
    });
  };

  @Bind()
  @Debounce(500)
  renderChart = (nextProps) => {
    // const colors = ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#9AE65C'];
    const { data, height } = nextProps || this.props;

    if (data.length < 1 || !this.root) {
      return;
    }

    const h = height * 4;
    const w = this.root.offsetWidth * 4;

    const imageMask = new Image();
    imageMask.crossOrigin = '';
    imageMask.src = imgUrl;

    imageMask.onload = () => {
      const dv = new DataSet.View().source(data);
      const range = dv.range('value');
      const [min, max] = range;
      dv.transform({
        type: 'tag-cloud',
        fields: ['name', 'value'],
        imageMask,
        font: 'Verdana',
        size: [w, h], // 宽高设置最好根据 imageMask 做调整
        padding: 5,
        timeInterval: 5000, // max execute time
        rotate() {
          return 0;
        },
        fontSize(d) {
          // eslint-disable-next-line
          return Math.pow((d.value - min) / (max - min), 2) * (70 - 20) + 20;
        },
      });

      this.setState({
        dv,
        w,
        h,
      });
    };
  };

  render() {
    const { className, height } = this.props;
    const { dv, w, h } = this.state;

    return (
      <div
        className={classNames(styles.tagCloud, className)}
        style={{ width: '100%', height }}
        ref={this.saveRootRef}
      >
        {dv && (
          <Chart width={w} height={h} data={dv} padding={0}>
            <Coord reflect="y" />
            <Geom type="point" position="x*y" color="text" shape="cloud" />
          </Chart>
        )}
      </div>
    );
  }
}

export default TagCloud;
