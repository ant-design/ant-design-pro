import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ adapterModel, loading }) => ({
  adapterList: adapterModel.adapterList,
  loading: loading.models.adapterList,
}))
class AdapterSelectView extends PureComponent {
  componentDidMount = () => {
    const { dispatch,record } = this.props;
    const payload=record?{pointType:record.backendType}:{pointType:'in,out'};

    dispatch({
      type: 'adapterModel/getAdapterList',
      payload,
    });
  };

  getOption() {
    const { adapterList } = this.props;
    return this.getOptionWhithList(adapterList);
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
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange,adapterList } = this.props;
    if(onChange){
      onChange(item);
    }
    const { onMyChange } = this.props;
    if(onMyChange){
      const cur=adapterList.find(obj=>obj.id===item);
      onMyChange(item,cur.name);
    }
  };

  render() {
    // const value = this.conversionObject();
    const { value,style, ...restProps} = this.props;
    return (
      <Select value={value} onSelect={this.selectChangeItem} style={style} {...restProps}>
        {this.getOption()}
      </Select>
    );
  }
}

export default AdapterSelectView;
