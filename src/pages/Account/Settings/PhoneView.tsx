import { Input } from 'antd';
import React, { Fragment } from 'react';
import styles from './PhoneView.less';

interface PhoneProps {
  value?: string;
  onChange?: (e: string) => void;
}

const PhoneView: React.SFC<PhoneProps> = props => {
  const { value, onChange } = props;
  let values = ['', ''];
  if (value) {
    values = value.split('-');
  }
  return (
    <Fragment>
      <Input
        className={styles.area_code}
        value={values[0]}
        onChange={e => {
          onChange(`${e.target.value}-${values[1]}`);
        }}
      />
      <Input
        className={styles.phone_number}
        onChange={e => {
          onChange(`${values[0]}-${e.target.value}`);
        }}
        value={values[1]}
      />
    </Fragment>
  );
};

export default PhoneView;
