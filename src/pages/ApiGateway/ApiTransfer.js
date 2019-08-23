import React, { PureComponent } from 'react';
import { Transfer, Modal, message } from 'antd';
import { connect } from 'dva';

@connect(({wsdlModel, loading}) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
class ApiTransfer extends PureComponent {
  state = {
    targetKeys: [],// 右侧显示数据
    selectedKeys: [],
    oriSelectedArray: [],
    modalVisible: false
  };

  componentDidMount = () => {
    const { modalVisible } = this.props;
    this.setState({ modalVisible });
  };

  componentWillReceiveProps(nextProps) {
    const { modalVisible } = this.props;
    const { modalVisible: nextModalVisible,selectedRow:nextSelectedRow } = nextProps;
    // console.log('modalVisible444:', modalVisible, 'selectedRow11231:', selectedRow);
    if (nextModalVisible !== modalVisible) {
      this.setState({ modalVisible: nextModalVisible });
    }
    console.log('selectedRow:', nextSelectedRow);
    if (nextModalVisible !== modalVisible) {
      const { relationName } = this.props;
      const oriSelectedArray =
        nextSelectedRow && nextSelectedRow[relationName] ? nextSelectedRow[relationName] : [];
      const oriTargetKeys = oriSelectedArray.map(item => item.apiId);
      console.log('oriSelectedArray123:', oriSelectedArray);
      this.setState({ targetKeys: oriTargetKeys, oriSelectedArray });
    }
  }

  okHandle = () => {
    const { targetKeys } = this.state;
    // console.log('okHandle', this.state);
    const {
      dispatch,
      selectedRow,
      keyName,
      wsdlId,
    } = this.props;

    const { oriSelectedArray } = this.state;
    const willUpdateArray = [];
    oriSelectedArray.forEach(item => {
      const targetKey = targetKeys.find(value => value === item[keyName]);
      if (targetKey) {
        willUpdateArray.push(item.apiId);
      }
    });
    targetKeys.forEach(value => {
      const role = oriSelectedArray.find(item => item[keyName] === value);
      if (!role) {
        willUpdateArray.push(value);
      }
    });
    // console.log('---willUpdateArray2:', willUpdateArray);

    const { appkey } = selectedRow;
    const payload = {
      data: {
        info: { wsdlId,appkey, apiIds:willUpdateArray  },
      },
    };

    dispatch({
      type: 'wsdlModel/saveAuth',
      payload,
      callback: resp => {
        if (resp.code === '200') {
          const msg = resp.msg || 'success.';
          const { onVisible, onRefreshData } = this.props;
          onVisible(null,false);
          onRefreshData();
          message.success(msg);
        } else {
          const msg = resp.msg || '服务器内部错误。';
          message.error(msg);
        }
      }
    });
  };

  cancelHandle = () => {
    const { onVisible } = this.props;
    onVisible(null,false);
  };

  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };

  // handleScroll = (direction, e) => {
  //   // console.log('direction:', direction);
  //   // console.log('target:', e.target);
  // }

  setKey = record => {
    const { keyName } = this.props;
    // // console.log("------11111aaaa--",keyName,record,record[keyName])
    return record[keyName];
  };

  render() {
    const { apiServices,title } = this.props;
    const { targetKeys, selectedKeys, modalVisible } = this.state;
    // console.log('targetKeys----:', targetKeys);
    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={() => this.okHandle()}
        onCancel={() => this.cancelHandle()}
        width={700}
      >
        <Transfer
          showSearch
          rowKey={this.setKey}
          dataSource={apiServices}
          titles={['未选择', '已选择']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          onScroll={this.handleScroll}
          render={item => `${item.apiId}-${item.name}`}
          listStyle={{
            width: 300,
            height: 300,
          }}
        />
      </Modal>
    );
  }
}

export default ApiTransfer;
