import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';
import React from 'react';
import useStyles from './index.style';
export type NumberInfoProps = {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  renderSubTitle?: () => React.ReactNode;
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
  renderSubTitle,
  total,
  subTotal,
  status,
  suffix,
  gap,
  ...rest
}) => {
  const { styles } = useStyles();
  const subTitleNode = renderSubTitle?.() ?? subTitle;
  const hasSubTitle = subTitleNode !== null && subTitleNode !== undefined;
  return (
    <div
      className={clsx({
        [styles[`numberInfo${theme}` as keyof typeof styles]]: !!theme,
      })}
      {...rest}
    >
      {title && (
        <div
          className={styles.numberInfoTitle}
          title={typeof title === 'string' ? title : ''}
        >
          {title}
        </div>
      )}
      {hasSubTitle && (
        <div
          className={styles.numberInfoSubTitle}
          title={typeof subTitleNode === 'string' ? subTitleNode : ''}
        >
          {subTitleNode}
        </div>
      )}
      <div
        className={styles.numberInfoValue}
        style={
          gap
            ? {
                marginTop: gap,
              }
            : {}
        }
      >
        <span>
          {total}
          {suffix && <em className={styles.suffix}>{suffix}</em>}
        </span>
        {(status || subTotal) && (
          <span className={styles.subTotal}>
            {subTotal}
            {status && status === 'up' ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </span>
        )}
      </div>
    </div>
  );
};
export default NumberInfo;
