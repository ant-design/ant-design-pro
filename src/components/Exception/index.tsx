import { Button } from 'antd';
import classNames from 'classnames';
import React, { createElement } from 'react';
import styles from './index.less';
import config from './typeConfig';
import Link from 'umi/link';

export interface ExceptionProps {
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | typeof Link;
  style?: React.CSSProperties;
  className?: string;
  backText?: React.ReactNode;
  redirect?: string;
}

class Exception extends React.Component<ExceptionProps> {
  render() {
    const {
      className,
      backText = 'back to home',
      linkElement = 'a',
      type = '404',
      title,
      desc,
      img,
      actions,
      redirect = '/',
      ...rest
    } = this.props;
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
            {actions ||
              createElement(
                linkElement,
                {
                  to: redirect,
                  href: redirect,
                },
                <Button type="primary">{backText}</Button>,
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Exception;
