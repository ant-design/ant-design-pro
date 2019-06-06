import React, { PureComponent } from 'react';
import { Transfer, Modal, message } from 'antd';
import { connect } from 'dva';

@connect(({ userModel, uniComp, loading }) => ({
  userList: userModel.userList,
  uniComp,
  loading: loading.models.userList,
}))
class UserTransfer extends PureComponent {
  state = {
    targetKeys: [],
    selectedKeys: [],
    oriSelectedArray: [],
    modalVisible: false,
  };

  componentDidMount = () => {
    const { dispatch, modalVisible } = this.props;
    this.setState({ modalVisible });
    dispatch({
      type: 'userModel/allUserList',
      payload: { setDisabled: false },
    });
  };

  componentWillReceiveProps(nextProps) {
    const { modalVisible, selectedRow } = this.props;
    const { modalVisible: nextModalVisible } = nextProps;
    console.log('modalVisible444:', modalVisible, 'selectedRow11231:', selectedRow);
    if (nextModalVisible !== modalVisible) {
      this.setState({ modalVisible: nextModalVisible });
    }
    console.log('console.log(selectedRow);', selectedRow);
    if (nextModalVisible && !modalVisible && selectedRow) {
      const { relationName } = this.props;
      const oriSelectedArray =
        selectedRow && selectedRow[relationName] ? selectedRow[relationName] : [];
      const oriTargetKeys = oriSelectedArray.map(item => item.userId);
      console.log('oriSelectedArray123:', oriSelectedArray);
      this.setState({ targetKeys: oriTargetKeys, oriSelectedArray });
    }
  }

  okHandle = () => {
    const { targetKeys } = this.state;
    console.log('okHandle', this.state);
    const {
      dispatch,
      columnSchemas: { key, relationKey, tableName },
      selectedRow,
      keyName,
      relationName,
    } = this.props;
    console.log('okHandle-props', this.props);
    const relationKeyName = relationKey || key;
    console.log('relationKeyName', relationKeyName, 'key', key);
    const { oriSelectedArray } = this.state;
    const willUpdateArray = [];
    oriSelectedArray.forEach(item => {
      const targetKey = targetKeys.find(value => value === item[keyName]);
      if (!targetKey) {
        willUpdateArray.push({ ...item, act: 'D' }); // 删除
      } else {
        willUpdateArray.push(item); // 不改变
      }
    });
    targetKeys.forEach(value => {
      const role = oriSelectedArray.find(item => item[keyName] === value);
      if (!role) {
        willUpdateArray.push({
          [relationKeyName]: selectedRow[key],
          userId: value,
          act: 'A',
          orgId: selectedRow[key],
        }); // 新增
      }
    });
    console.log('---willUpdateArray2:', willUpdateArray);

    const info = {
      option: 8, // 1-新增记录 2-修改记录,8-关联修改
      tableName,
      data: {
        info: { ...selectedRow, [relationName]: willUpdateArray },
      },
    };
    // console.log("request submitRelation:",info);
    dispatch({
      type: 'uniComp/save',
      payload: info,
      callback: response => {
        if (response.code === '200') {
          const msg = response.msg || 'success.';
          const { onVisible, onRefreshData } = this.props;
          onVisible(false);
          console.log('----0000000');
          onRefreshData();
          message.success(msg);
        } else {
          const msg = response.msg || '服务器内部错误。';
          message.error(msg);
        }
      },
    });
  };

  cancelHandle = () => {
    const { onVisible } = this.props;
    onVisible(false);
    // this.setState({
    //   modalVisible: false,
    //   Privilege: null,
    // });
  };

  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
    // console.log('targetKeys: ', nextTargetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    // console.log('targetSelectedKeys: ', targetSelectedKeys);
  };

  // handleScroll = (direction, e) => {
  //   console.log('direction:', direction);
  //   console.log('target:', e.target);
  // }

  setKey = record => {
    const { keyName } = this.props;
    // console.log("------11111aaaa--",keyName,record,record[keyName])
    return record[keyName];
  };

  render() {
    const { userList } = this.props;
    const { targetKeys, selectedKeys, modalVisible } = this.state;
    console.log('userList:', userList);
    console.log('targetKeys----:', targetKeys);
    return (
      <Modal
        title="授权"
        visible={modalVisible}
        onOk={() => this.okHandle()}
        onCancel={() => this.cancelHandle()}
      >
        <Transfer
          showSearch
          rowKey={this.setKey}
          dataSource={userList}
          titles={['未选择', '已选择']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          render={item => `${item.userId}-${item.username}`}
          listStyle={{
            width: 200,
            height: 300,
          }}
        />
      </Modal>
    );
  }
}

export default UserTransfer;
