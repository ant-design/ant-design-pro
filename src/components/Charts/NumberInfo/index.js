import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import styles from './index.less';

export default ({ theme, title, subTitle, total, subTotal, status, suffix, ...rest }) => (
  <div
    className={
      classNames(styles.numberInfo, {
        [styles[`numberInfo${theme}`]]: theme,
      })
    }
    {...rest}
  >
    {
      title && <h4>{title}</h4>
    }
    <h6>{subTitle}</h6>
    <div>
      <span>{total}{suffix && <em className={styles.suffix}>{suffix}</em>}</span>
      {
        (status || subTotal) && (
          <span className={styles.subTotal}>
            {subTotal}
            {status && <Icon type={`caret-${status}`} />}
          </span>
        )
      }
    </div>
  </div>
);
