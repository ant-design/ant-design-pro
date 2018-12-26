import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

@connect(({ componentModel, loading }) => ({
  componentModel,
  loading: loading.models.componentModel,
}))
class BindDataSelect extends PureComponent {
  render() {
    return <Select />;
  }
}
export default BindDataSelect;
