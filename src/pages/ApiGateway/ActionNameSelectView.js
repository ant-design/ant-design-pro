import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ wsdlModel, loading }) => ({
  parse: wsdlModel.parse,
  loading: loading.models.parse,
}))
class ActionNameSelectView extends PureComponent {

  componentDidMount = () => {
    const { dispatch, wsdlId } = this.props;
    // console.log("userId",userId);
    dispatch({
      type: 'wsdlModel/parseWsdl',
      payload: { wsdlId },
    });
  };

  componentWillReceiveProps = (nextProps) => {
    const { wsdlId,dispatch } = this.props;
    if(wsdlId !== nextProps.wsdlId){
      const nextWsdlId = nextProps.wsdlId;
      dispatch({
        type: 'wsdlModel/parseWsdl',
        payload: { wsdlId:nextWsdlId },
      });
    }
  };

  getOption() {
    const { parse } = this.props;
    const { addActionNames } = parse || {addActionNames:[]};
    return this.getOptionWhithList(addActionNames);
  }

  getOptionWhithList = (list) => {

    if(!list || list.length < 1){
      return ;
    }

    return list.map(item => (
      <Option key={item} value={item}>
        {item}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {

    const { value } = this.props;
    return (
      <Select style={{ width: '100%' }} value={value} onSelect={this.selectChangeItem}>
        {this.getOption()}
      </Select>
    );
  }
}

export default ActionNameSelectView;
