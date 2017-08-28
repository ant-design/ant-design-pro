import React, { Component } from 'react';
import { Tooltip } from 'antd';

import styles from './index.less';

/* eslint no-return-assign: 0 */
class MapChart extends Component {
  getRect() {
    // 0.4657 = 708 / 1520 (img origin size)
    const width = this.root.offsetWidth;
    const height = width * 0.4657;
    return {
      width,
      height,
    };
  }

  render() {
    return (
      <div className={styles.mapChart} ref={n => (this.root = n)}>
        <Tooltip title="等待实现">
          <div className={styles.canvas} ref={n => (this.root = n)}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/fBcAYoxWIjlUXwDjqvzg.png" alt="map" />
            <div ref={n => (this.node = n)} />
          </div>
        </Tooltip>
      </div>
    );
  }
}

export default MapChart;
