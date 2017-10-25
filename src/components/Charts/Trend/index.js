import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const Trend = ({ colorful, flag, children, ...rest }) => {
  const classString = classNames(styles.trendItem, {
    [styles.trendItemGrey]: !colorful,
  });
  return (
    <div
      {...rest}
      className={classString}
      title={typeof children === 'string' ? children : ''}
    >
      <span className={styles.value}>{children}</span>
      {flag && <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>}
    </div>
  );
};

export default Trend;
