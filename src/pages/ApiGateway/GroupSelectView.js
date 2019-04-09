import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;
@connect(({ groupModel, loading }) => ({
  groupList: groupModel.groupList,
  loading: loading.models.groupList,
}))
class GroupSelectView extends PureComponent {
  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'groupModel/allGroupList',
    });
  };

  getOption() {
    const { groupList } = this.props;
    return this.getOptionWhithList(groupList);
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
      <Option key={item.groupId} value={item.groupId}>
        {item.groupName}
      </Option>
    ));
  };

  selectChangeItem = item => {
    const { onChange } = this.props;
    onChange(item);
  };

  render() {
    // const value = this.conversionObject();
    const { value,style } = this.props;
    return (
      <Select value={value} onSelect={this.selectChangeItem} style={style}>
        {this.getOption()}
      </Select>
    );
  }
}

export default GroupSelectView;
