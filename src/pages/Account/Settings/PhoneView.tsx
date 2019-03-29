import { Input } from 'antd';
import React, { Component, Fragment } from 'react';
import styles from './PhoneView.less';

interface PhoneProps {
  onChange?: (e: string) => void;
  value?: string;
}

export default class PhoneView extends Component<PhoneProps> {
  static defaultProps: PhoneProps = {
    onChange: () => {},
  };

  render() {
    const { value, onChange } = this.props;
    const values = value ? value.split('-') : ['', ''];
    return (
      <Fragment>
        <Input
          className={styles.area_code}
          value={values[0]}
          onChange={e => onChange!(`${e.target.value}-${values[1]}`)}
        />
        <Input
          className={styles.phone_number}
          onChange={e => onChange!(`${values[0]}-${e.target.value}`)}
          value={values[1]}
        />
      </Fragment>
    );
  }
}
