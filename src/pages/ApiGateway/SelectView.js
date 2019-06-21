import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { getItems, getItemValue } from '@/utils/masterData';

const { Option } = Select;
const nullSlectItem = {
  label: '',
  key: '',
};
class SelectView extends PureComponent {
  getOption() {
    const { javaCode, javaKey } = this.props;
    const items = getItems(javaCode, javaKey);
    // console.log("items:",items);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    // console.log("item:",item);
    onChange(item);
  };

  conversionObject() {
    const { javaCode, javaKey, value } = this.props;
    console.log(javaCode, javaKey, value);
    if (!value) {
      return nullSlectItem;
    }
    const itemValue = value && value.key ? value.key : value;
    const valueLabel = {
      label: getItemValue(javaCode, javaKey, itemValue),
      key: itemValue,
    };
    return valueLabel || nullSlectItem;
  }

  render() {
    // const value = this.conversionObject();
    const { value,style, ...restProps } = this.props;
    // console.log("value:",value);
    return (
      <Select value={value} onSelect={this.selectChangeItem} style={style} {...restProps}>
        {this.getOption()}
      </Select>
    );
  }
}

export default SelectView;
