import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ wsdlModel, loading }) => ({
  wsdlList: wsdlModel.wsdlList,
  loading: loading.models.wsdlList,
}))
class WsdlSelectView extends PureComponent {
  componentDidMount = () => {
    const { dispatch, userId } = this.props;
    // console.log("userId",userId);
    dispatch({
      type: 'wsdlModel/fetchWsdlListForSelectView',
      payload: { userId },
    });
  };

  getOption(sign) {
    const { wsdlList } = this.props;
    return this.getOptionWhithList(wsdlList,sign);
  }

  getOptionWhithList = (list,sign) => {

    let newList = list;

    if(sign){

      const comItem ={
        wsdlId : 0,
        wsdlName : "Please select one wsdl"
      };
      newList = newList.filter(item=>item.wsdlId !== 0);
      newList.unshift(comItem);
    }
    else if(!list || list.length < 1){
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }

    return newList.map(item => (
      <Option key={item.wsdlId} value={item.wsdlId}>
        {item.wsdlName}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value,sign } = this.props;
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem}>
        {this.getOption(sign)}
      </Select>
    );
  }
}

export default WsdlSelectView;
