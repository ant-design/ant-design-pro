import React from 'react';
import { Icon } from 'antd';

import styles from './index.less';

const Item = ({ title, flag, children, ...rest }) => (
  <div {...rest} className={styles.trendItem}>
    <span className={styles.title}>{title}</span>
    { flag && <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>}
    <span className={styles.value}>{children}</span>
  </div>
);

const Trend = ({ colorType, children, ...rest }) => (
  <div className={colorType ? (styles[`trend${colorType}`] || styles.trend) : styles.trend} {...rest}>
    {children}
  </div>
);

Trend.Item = Item;

export default Trend;
