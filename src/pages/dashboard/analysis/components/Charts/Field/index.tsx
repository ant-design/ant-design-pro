import React from 'react';
import useStyles from './index.style';
export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
};
const Field: React.FC<FieldProps> = ({ label, value, ...rest }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.field} {...rest}>
      <span className={styles.label}>{label}</span>
      <span className={styles.number}>{value}</span>
    </div>
  );
};
export default Field;
