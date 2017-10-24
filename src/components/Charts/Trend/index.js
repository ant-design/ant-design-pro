import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Tooltip } from 'antd';

import styles from './index.less';

const Item = ({ title, flag, children, ...rest }, { mini }) => {
  const map = {
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xlg: 0,
    xl: 0,
    xxl: 0,
  };

  if (mini && mini.forEach) {
    mini.forEach((size) => {
      map[size] = 1;
    });
  }

  const clsObj = {};
  Object.keys(map).forEach((k) => {
    clsObj[styles[k]] = map[k];
  });

  const clsString = classNames(styles.trendItem, {
    [styles.mini]: (typeof mini === 'boolean' && mini),
    ...clsObj,
  });

  const miniContent = (
    <Tooltip title={children}>
      <span className={styles.title}>{title}</span>
      { flag && <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>}
    </Tooltip>
  );

  return (
    <div {...rest} className={clsString}>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{children}</span>
        {flag && <span className={styles[flag]}><Icon type={`caret-${flag}`} /></span>}
      </div>
      <div className={styles.miniContent}>
        {miniContent}
      </div>
    </div>
  );
};

Item.contextTypes = {
  mini: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

class Trend extends React.Component {
  getChildContext() {
    return {
      mini: this.props.mini,
    };
  }

  render() {
    const { colorType, children, mini, ...rest } = this.props;
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

Trend.childContextTypes = {
  mini: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
};

Trend.Item = Item;

export default Trend;
