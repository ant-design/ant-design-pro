import omit from '@rc-component/util/es/omit';
import { Card } from 'antd';
import type { CardProps } from 'antd/es/card';
import { clsx } from 'clsx';
import React from 'react';
import useStyles from './index.style';

type totalType = () => React.ReactNode;

type ChartCardProps = {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
} & CardProps;

const ChartCardTotal: React.FC<{
  total?: number | totalType | React.ReactNode;
  totalClassName: string;
}> = ({ total, totalClassName }) => {
  if (!total && total !== 0) {
    return null;
  }
  switch (typeof total) {
    case 'undefined':
      return null;
    case 'function':
      return <div className={totalClassName}>{total()}</div>;
    default:
      return <div className={totalClassName}>{total}</div>;
  }
};

const ChartCardContent: React.FC<
  ChartCardProps & { styles: Record<string, string> }
> = ({
  contentHeight,
  title,
  avatar,
  action,
  total,
  footer,
  children,
  styles,
}) => (
  <div className={styles.chartCard}>
    <div
      className={clsx(styles.chartTop, {
        [styles.chartTopMargin]: !children && !footer,
      })}
    >
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.metaWrap}>
        <div className={styles.meta}>
          <span>{title}</span>
          <span className={styles.action}>{action}</span>
        </div>
        <ChartCardTotal total={total} totalClassName={styles.total} />
      </div>
    </div>
    {children && (
      <div
        className={styles.content}
        style={{
          height: contentHeight || 'auto',
        }}
      >
        <div className={contentHeight ? styles.contentFixed : undefined}>
          {children}
        </div>
      </div>
    )}
    {footer && (
      <div
        className={clsx(styles.footer, {
          [styles.footerMargin]: !children,
        })}
      >
        {footer}
      </div>
    )}
  </div>
);

const ChartCard: React.FC<ChartCardProps> = (props) => {
  const { styles } = useStyles();
  const { loading = false, ...rest } = props;
  const cardProps = omit(rest, ['total', 'contentHeight', 'action']);
  return (
    <Card
      loading={loading}
      styles={{
        body: {
          padding: '20px 24px 8px 24px',
        },
      }}
      {...cardProps}
    >
      {loading ? false : <ChartCardContent {...props} styles={styles} />}
    </Card>
  );
};
export default ChartCard;
