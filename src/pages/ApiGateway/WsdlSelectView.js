import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import constants from '@/utils/constUtil';

const { API_STATUS } = constants;

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

  getOption(sign,status) {
    const { wsdlList } = this.props;
    return this.getOptionWhithList(wsdlList,sign,status);
  }

  getOptionWhithList = (list,sign,status) => {

    let newList = list;

    if(sign){

      const comItem ={
        wsdlId : 0,
        wsdlName : "please choose one wsdl"
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

    if( status > 0 ){
      newList = newList.filter(item=>item.status === API_STATUS.ONLINE);
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
    const { onSetUrl } = this.props;
    if(onSetUrl){
      const { wsdlList } = this.props;
      const wsdlObj=wsdlList.find((obj)=>obj.wsdlId===item);
      onSetUrl(wsdlObj);
    }
  };

  render() {
    // const value = this.conversionObject();
    const { value,sign,isDisable,status } = this.props;
    const disable = isDisable?'disabled':'';
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem} disabled={disable}>
        {this.getOption(sign,status)}
      </Select>
    );
  }
}

export default WsdlSelectView;
