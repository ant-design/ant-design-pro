import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const IconUp = ({ color, className, ...rest }) => (
  <Icon
    {...rest}
    className={classNames(styles.normal, className, {
      [styles.up]: color !== false,
    })}
    type="caret-up"
  />
);

const IconDown = ({ color, className, ...rest }) => (
  <Icon
    {...rest}
    className={classNames(styles.normal, className, {
      [styles.down]: color !== false,
    })}
    type="caret-down"
  />
);

export default {
  IconUp,
  IconDown,
};
