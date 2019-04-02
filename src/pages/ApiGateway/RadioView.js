import React, { PureComponent } from 'react';
import { Radio } from 'antd';
import { getItems } from '@/utils/masterData';

const  RadioGroup  = Radio.Group;

class RadioView extends PureComponent {

  state = {
    innerValue: '',
  }

  componentDidMount() {
    const {value} = this.props;
    this.setState({innerValue: value});
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      innerValue: e.target.value,
    });
    const { onChange } = this.props;
    // console.log("item:",item);
    onChange(e);
    console.log("e:",e);
  }

  getRadio() {
    const { javaCode, javaKey } = this.props;
    const items = getItems(javaCode, javaKey);
    // console.log("items:",items);
    return this.getRadioWhithList(items);
  }

  getRadioWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Radio key={0} value={0}>
          没有找到选项
        </Radio>
      );
    }
    return list.map(item => (
      <Radio key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Radio>
    ));
  };


  render() {
    // const value = this.conversionObject();
    const {innerValue}=this.state;
    // console.log("value:",value);
    return (
      <RadioGroup onChange={this.onChange} value={innerValue}>
        {this.getRadio()}
      </RadioGroup>
    );
  }
}

export default RadioView;
