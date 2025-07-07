import classNames from 'classnames';
import React from 'react';
import useStyles from './index.style';

type StandardFormRowProps = {
  title?: string;
  last?: boolean;
  block?: boolean;
  grid?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};
const StandardFormRow: React.FC<StandardFormRowProps> = ({
  title,
  children,
  last,
  block,
  grid,
  ...rest
}) => {
  const { styles } = useStyles();
  const cls = classNames(styles.standardFormRow, {
    [styles.standardFormRowBlock]: block,
    [styles.standardFormRowLast]: last,
    [styles.standardFormRowGrid]: grid,
  });
  return (
    <div className={cls} {...rest}>
      {title && (
        <div className={styles.label}>
          <span>{title}</span>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default StandardFormRow;
