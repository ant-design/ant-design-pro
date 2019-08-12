import React, {PureComponent} from 'react';
import { Upload, Button, Icon, message, Row, Col, Form, Input,Modal } from 'antd';

import { connect } from 'dva';

import RadioView from "./RadioView";
import GroupSelectView from './GroupSelectView';
import {getUserId} from "../../utils/authority";

@connect(({ wsdlModel, loading }) => ({
  wsdlModel,
  loading: loading.models.wsdlModel,
}))
@Form.create()
class WsdlApi extends PureComponent {

  state = {
    apiVisible: false
  };

  componentWillMount() {

    const {apiVisible} = this.props;
    this.setState({ apiVisible });
    console.log("apiVisible",apiVisible);
  }


  componentWillReceiveProps(nextProps) {

    const { apiVisible } = this.props;
    const nextVisible = nextProps.apiVisible;
    if (apiVisible !== nextVisible) {
      this.setState({ apiVisible:nextVisible });
    }
  }

  getPayloadForWsdl = (selectedRow,values) =>{

    const createUser = getUserId();

    const wsdl = {...selectedRow,createUser};


    const payload = {};

    payload.data = {};
    payload.data.info = {wsdl,...values};
    return payload;

  }

  setApi = ( ) =>{

    const {
      form :{validateFieldsAndScroll},
      dispatch,
      selectedRow
    } = this.props;

    validateFieldsAndScroll((error, values) => {
      if (!error) {

        const wsdl = this.getPayloadForWsdl(selectedRow, values);

        dispatch({
          type: 'wsdlModel/saveBatchApi',
          payload:wsdl,
          callback: resp => {

            if (resp.code === '200') {
              const msg = resp.msg || 'success.';
              const { onVisible, onRefreshData } = this.props;
              onVisible(null,false);
              onRefreshData();
              message.success(msg);
            } else {
              const msg = resp.msg || 'Server Internal Error.';
              message.error(msg);
            }

          },
        });

      }
    });

  }

  cancelApi = () =>{
    const {onVisible} = this.props;
    onVisible(null,false);
  }

  render() {

    const {apiVisible} = this.state;
    const {
      form:{getFieldDecorator},
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    };

    return (
      <div>

        <Modal
          title="Set Api"
          visible={apiVisible}
          onOk={() => this.setApi()}
          onCancel={() => this.cancelApi()}
        >
          <Form layout="horizontal" style={{maxWidth: 500}}>
            <Form.Item {...formItemLayout} label="groups">
              {getFieldDecorator('apiService.groupId', {
                rules: [{ required: true, message: 'Please select groups' }],
              })(<GroupSelectView showSearch optionFilterProp="children" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Api Range">
              {getFieldDecorator('apiService.apiType', {
                initialValue: '1',
                rules: [{ required: true, message: 'Please Select Api Range' }],
              })(<RadioView javaCode="apiService" javaKey="api_type" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="connect timeout（ms）">
              {getFieldDecorator('apiServiceBackend.connectTimeout', {
                initialValue: '30000',
                rules: [
                  { required: true, message: 'connect timeout（ms）' },
                  {
                    pattern: /^[0-9]*[1-9][0-9]*$/,
                    message: 'Malformed number',
                  },
                ],
              })(<Input placeholder="Please input connect timeout（ms）" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="socket timeout（ms）">
              {getFieldDecorator('apiServiceBackend.socketTimeout', {
                initialValue: '20000',
                rules: [
                  { required: true, message: 'socket timeout（ms）' },
                  {
                    pattern: /^[0-9]*[1-9][0-9]*$/,
                    message: 'Malformed number',
                  },
                ],
              })(<Input placeholder="Please input socket timeout（ms）" />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default WsdlApi;
