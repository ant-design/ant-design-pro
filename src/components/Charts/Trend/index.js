import React from 'react';
import { Icon } from 'antd';

import styles from './index.less';

const Item = ({ title, flag, children, ...rest }) => {
  return (
    <div {...rest} className={styles.trendItem}>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{children}</span>
        {flag && <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>}
      </div>
    </div>
  );
};

class Trend extends React.Component {
  render() {
    const { colorType, children, ...rest } = this.props;
    return (
      <div
        className={colorType ? (styles[`trend${colorType}`] || styles.trend) : styles.trend}
        {...rest}
      >
        {children}
      </div>
    );
  }
}

Trend.Item = Item;

export default Trend;
