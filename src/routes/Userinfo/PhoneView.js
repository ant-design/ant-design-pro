import React, { Fragment, PureComponent } from 'react';
import { Input } from 'antd';

class PhoneView extends PureComponent {
  render() {
    const { value, onChange } = this.props;
    let values = ['', ''];
    if (value) {
      values = value.split('-');
    }
    return (
      <Fragment>
        <Input
          value={values[0]}
          onChange={(e) => {
            onChange(`${e.target.value}-${values[1]}`);
          }}
          style={{ width: 128, marginRight: 8 }}
        />
        <Input
          onChange={(e) => {
            onChange(`${values[0]}-${e.target.value}`);
          }}
          value={values[1]}
          style={{ width: 312 }}
        />
      </Fragment>
    );
  }
}

export default PhoneView;
