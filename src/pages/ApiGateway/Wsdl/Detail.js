import React, {PureComponent} from 'react';
import {Card, Table, Row, Button, Modal, message} from 'antd';
import {connect} from 'dva';

const fieldLabels = {
  wsdlName: 'WSDL Name：',
  addActionNames: 'Add Action Name',
  delActionNames: 'Del Action Name',
  actionNames: 'Current Action Name',
}

@connect(({apiGatewayModel, loading}) => ({
  apiGatewayModel,
  loading: loading.models.apiGatewayModel,
}))
class Detail extends PureComponent {

  state = {
    modalVisible: false
  }

  handleDel = () => {
    this.setState({modalVisible: true});
  }

  okHandle = () => {

    const {onDetail, dispatch} = this.props;

    const {parseList} = this.props;
    const {delActionNames} = parseList || {delActionNames: []};

    if (delActionNames.length === 0) {
      message.error('Sorry,delete Action Name is fail.Because it has not thing.');
      return;
    }

    const apiIds = delActionNames.map((item) => {
      return item.apiId
    });

    const payload = {

      data: {
        info: {
          apiIds
        }
      }

    };
    //  删除数据
    dispatch({
      type: 'apiGatewayModel/removeApis',
      payload,
      callback: (resp) => {
        const {code} = resp;
        let {msg} = resp;
        if (code === '200') {
          if (!msg || msg === '') {
            msg = 'Success';
          }
          message.success(msg);
          this.setState({modalVisible: false});
          // 查询信息
          onDetail();
        } else {
          message.error(`error:${msg}`);
        }
      }
    });
  }

  cancelHandle = () => {
    this.setState({modalVisible: false});
  }

  render() {
    const {modalVisible} = this.state;
    const {selectedRow, parseList} = this.props;
    const {wsdlName} = selectedRow || {wsdlName: ''};
    const {addActionNames, delActionNames, actionNames} = parseList || {
      addActionNames: [],
      delActionNames: [],
      actionNames: []
    };
    const addActions = addActionNames.map((item) => ({
      'apiName': item
    }));
    const actions = actionNames.map((item) => ({
      'apiName': item
    }));
    const addColumns = [
      {
        title: 'Api Name',
        dataIndex: 'apiName',
        width: 600,
      },
    ];
    const delColumns = [
      {
        title: 'Api Id',
        dataIndex: 'apiId',
        width: 300,
      },
      {
        title: 'Api Name',
        dataIndex: 'name',
        width: 300,
      },
    ];
    const extra = (
      <Button type="danger" onClick={this.handleDel}>
        Delete All
      </Button>
    );
    return (
      <Card title={`${fieldLabels.wsdlName}${wsdlName}`} bordered={false}>
        <Row>
          <Card title={fieldLabels.addActionNames} bordered={false}>
            <Table
              size="small"
              columns={addColumns}
              dataSource={addActions}
              pagination={false}
              scroll={{y: 240}}
            />
          </Card>
        </Row>
        <Row>
          <Card title={fieldLabels.delActionNames} bordered={false} extra={extra}>
            <Table
              size="small"
              columns={delColumns}
              dataSource={delActionNames}
              pagination={false}
              scroll={{y: 240}}
            />
          </Card>
        </Row>
        <Row>
          <Card title={fieldLabels.actionNames} bordered={false}>
            <Table
              size="small"
              columns={addColumns}
              dataSource={actions}
              pagination={false}
              scroll={{y: 240}}
            />
          </Card>
        </Row>
        <Modal
          title="Delete Api"
          visible={modalVisible}
          onOk={this.okHandle}
          onCancel={this.cancelHandle}
        >
          <span>Are you sure delete all api?</span>
        </Modal>

      </Card>
    );
  }
}

export default Detail;
