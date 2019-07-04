import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import { getUserId } from '@/utils/authority';

const { Option } = Select;
@connect(({ adapterModel, loading }) => ({
  adapterList: adapterModel.adapterList,
  loading: loading.models.adapterList,
}))
class AdapterSelectView extends PureComponent {

  state = {
    adapter: []
  };

  componentDidMount = () => {
    const { dispatch,record } = this.props;
    const payload=record?{pointType:record.backendType}:{pointType:'in,out'};
    const userId = getUserId();
    payload.userId = userId;
    console.log("AdapterSelectView",this.props);
    dispatch({
      type: 'adapterModel/getAdapterList',
      payload,
      callback: resp => {
        this.setState({ adapter:resp});
      },
    });
  };

  componentWillReceiveProps(nextProps) {

    console.log("comsss",nextProps);
    const { record,dispatch } = this.props;

    if (record !== nextProps.record) {

      const payload=nextProps.record?{pointType:nextProps.record.backendType}:{pointType:'in,out'};
      const userId = getUserId();
      payload.userId = userId;
      dispatch({
        type: 'adapterModel/getAdapterList',
        payload,
        callback: resp => {

          this.setState({
            adapter: resp
          });

          if(record.backendType !== nextProps.record.backendType){
            this.selectChangeItem(resp[0].id);
          }

        }
      });
    }
  }

  getOption() {
    // const { adapterList } = this.props;
    const { adapter } = this.state;
    return this.getOptionWhithList(adapter);
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
    const { onChange } = this.props;
    const { adapter } = this.state;
    if(onChange){
      onChange(item);
    }
    const { onMyChange } = this.props;
    if(onMyChange){
      const cur=adapter.find(obj=>obj.id===item);
      onMyChange(item,cur.name);
    }
  };

  render() {
    // const value = this.conversionObject();
    const { value,style, ...restProps} = this.props;
    // const valueSel = valueState  !== null ?  valueState  : value;
    return (
      <Select value={value} onSelect={this.selectChangeItem} style={style} {...restProps}>
        {this.getOption()}
      </Select>
    );
  }
}

export default AdapterSelectView;
