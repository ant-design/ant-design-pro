import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: '',
};

@connect(({ geographic }) => {
  const { province, isLoading, city } = geographic;
  return {
    province,
    city,
    isLoading,
  };
})
export default class ProvinceSelect extends PureComponent {
  componentDidMount = () => {
    this.props.dispatch({
      type: 'geographic/fetchProvince',
    });
  };
  getProvinceOption() {
    return this.getOption(this.props.province);
  }
  getCityOption = () => {
    return this.getOption(this.props.city);
  };
  getOption = (list) => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map((item) => {
      return (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      );
    });
  };
  selectProvinceItem = (item) => {
    this.props.dispatch({
      type: 'geographic/fetchCity',
      payload: item.key,
    });
    this.props.onChange({
      province: item,
      city: nullSlectItem,
    });
  };
  selectCityItem = (item) => {
    this.props.onChange({
      province: this.props.value.province,
      city: item,
    });
  };
  conversionObject() {
    const { value } = this.props;
    if (!value) {
      return {
        province: nullSlectItem,
        city: nullSlectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSlectItem,
      city: city || nullSlectItem,
    };
  }
  render() {
    const { province, city } = this.conversionObject();
    return (
      <Spin spinning={this.props.isLoading}>
        <Select
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
          style={{ width: 220, marginRight: 8 }}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
          style={{ width: 220 }}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    );
  }
}
