import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'react-router';
import config from './typeConfig';
import styles from './index.less';


export default ({ className, type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString} {...rest}>
      <div className={styles.imgBlock}>
        <div
          className={styles.imgEle}
          style={{ backgroundImage: `url(${img || config[pageType].img})` }}
        />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        <div className={styles.actions}>
          {actions || <Link to="/"><Button type="primary">返回首页</Button></Link>}
        </div>
      </div>
    </div>
  );
};
