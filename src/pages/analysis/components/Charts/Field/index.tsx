import React from 'react';

import styles from './index.less';

export interface IFieldProps {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
}

const Field: React.SFC<IFieldProps> = ({ label, value, ...rest }) => (
  <div className={styles.field} {...rest}>
    <span className={styles.label}>{label}</span>
    <span className={styles.number}>{value}</span>
  </div>
);

export default Field;
