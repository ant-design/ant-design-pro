import React from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import { Link } from 'dva/router';
import config from './typeConfig';
import styles from './index.less';


export default ({ className, type, title, desc, img, actions }) => {
  const pageType = type in config ? type : '404';
  const clsString = classNames(styles.exception, className);
  return (
    <div className={clsString}>
      <div className={styles.imgBlock}>
        <img src={img || config[pageType].img} alt="" />
      </div>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        <div className={styles.actions}>
          {actions || <Link to="/"><Button size="large" type="primary">返回首页</Button></Link>}
        </div>
      </div>
    </div>
  );
};
