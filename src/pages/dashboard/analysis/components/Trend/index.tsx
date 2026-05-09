import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';
import React from 'react';
import useStyles from './index.style';

type TrendProps = {
  colorful?: boolean;
  flag: 'up' | 'down';
  style?: React.CSSProperties;
  reverseColor?: boolean;
  className?: string;
  children?: React.ReactNode;
  title?: string;
};

const Trend: React.FC<TrendProps> = ({
  colorful = true,
  reverseColor = false,
  flag,
  children,
  className,
  title = '',
  ...rest
}) => {
  const { styles } = useStyles();
  const classString = clsx(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className,
  );
  return (
    <div {...rest} className={classString} title={title}>
      <span>{children}</span>
      {flag && (
        <span className={styles[flag]}>
          {flag === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  );
};
export default Trend;
