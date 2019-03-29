import { ConnectProps, ConnectState, GeographicModelState } from '@/models/connect';
import { Select, Spin } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { LabeledValue } from 'antd/es/select';
import { connect } from 'dva';
import React, { Component } from 'react';
import styles from './GeographicView.less';

const { Option } = Select;

const nullSelectItem: LabeledValue = {
  label: '',
  key: '',
};

export interface GeographicValue {
  province: LabeledValue;
  city: LabeledValue;
}

interface GeographicProps extends ConnectProps, Partial<GeographicModelState> {
  value?: GeographicValue;
  onChange?: (value: GeographicValue) => void;
  form?: WrappedFormUtils;
}

@connect(({ geographic }: ConnectState) => {
  const { province, isLoading, city } = geographic!;
  return {
    province,
    city,
    isLoading,
  };
})
class GeographicView extends Component<GeographicProps> {
  static defaultProps: GeographicProps = {
    onChange: () => {},
  };

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch!({
      type: 'geographic/fetchProvince',
    });
  };

  componentDidUpdate(props: GeographicProps) {
    const { dispatch, value } = this.props;

    if (!props.value && !!value && !!value.province) {
      dispatch!({
        type: 'geographic/fetchCity',
        payload: value.province.key,
      });
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    return this.getOption(province);
  }

  getCityOption = () => {
    const { city } = this.props;
    return this.getOption(city);
  };

  getOption = (list?: { [key: string]: any }[]) => {
    if (!list || list.length < 1) {
      return (
        <Option key="0" value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = (item: LabeledValue) => {
    const { dispatch, onChange } = this.props;
    dispatch!({
      type: 'geographic/fetchCity',
      payload: item.key,
    });
    if (onChange)
      onChange({
        province: item,
        city: nullSelectItem,
      });
  };

  selectCityItem = (item: LabeledValue) => {
    const { value, onChange } = this.props;
    if (onChange)
      onChange({
        province: value!.province,
        city: item,
      });
  };

  conversionObject(): GeographicValue {
    const { value } = this.props;
    if (!value) {
      return {
        province: nullSelectItem,
        city: nullSelectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSelectItem,
      city: city || nullSelectItem,
    };
  }

  render() {
    const { province, city } = this.conversionObject();
    const { isLoading } = this.props;
    return (
      <Spin spinning={isLoading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    );
  }
}

export default GeographicView;
