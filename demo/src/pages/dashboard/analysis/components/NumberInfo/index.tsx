import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export type NumberInfoProps = {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  total?: React.ReactNode | string;
  status?: 'up' | 'down';
  theme?: string;
  gap?: number;
  subTotal?: number;
  suffix?: string;
  style?: React.CSSProperties;
};
const NumberInfo: React.FC<NumberInfoProps> = ({
  theme,
  title,
  subTitle,
  total,
  subTotal,
  status,
  suffix,
  gap,
  ...rest
}) => (
  <div
    className={classNames(styles.numberInfo, {
      [styles[`numberInfo${theme}`]]: theme,
    })}
    {...rest}
  >
    {title && (
      <div className={styles.numberInfoTitle} title={typeof title === 'string' ? title : ''}>
        {title}
      </div>
    )}
    {subTitle && (
      <div
        className={styles.numberInfoSubTitle}
        title={typeof subTitle === 'string' ? subTitle : ''}
      >
        {subTitle}
      </div>
    )}
    <div className={styles.numberInfoValue} style={gap ? { marginTop: gap } : {}}>
      <span>
        {total}
        {suffix && <em className={styles.suffix}>{suffix}</em>}
      </span>
      {(status || subTotal) && (
        <span className={styles.subTotal}>
          {subTotal}
          {status && status === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  </div>
);

export default NumberInfo;
