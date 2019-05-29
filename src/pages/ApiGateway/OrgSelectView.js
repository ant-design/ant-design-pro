import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ orgModel, loading }) => ({
  orgList: orgModel.orgList,
  loading: loading.models.orgList,
}))
class OrgSelectView extends PureComponent {
  componentDidMount = () => {
    const { dispatch, orgType, userId } = this.props;
    // console.log("userId",userId);
    dispatch({
      type: 'orgModel/allOrgList',
      payload: { orgType: orgType, userId: userId },
    });
  };

  getOption() {
    const { orgList } = this.props;
    return this.getOptionWhithList(orgList);
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
        {item.orgName}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value } = this.props;
    return (
      <Select value={value} onSelect={this.selectChangeItem}>
        {this.getOption()}
      </Select>
    );
  }
}

export default OrgSelectView;
