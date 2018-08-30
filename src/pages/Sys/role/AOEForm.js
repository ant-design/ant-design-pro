import React, { Component } from 'react';
import { Row, Col, Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const Area = Input.TextArea;

@Form.create()
export default class AOEForm extends Component {
  componentDidMount() {
    console.info('load role detail');
  }

  // 校验角色编码唯一性
  checkCode = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    const code = getFieldValue('code');
    const { item } = this.props;

    if (item && item.id && value === item.code) {
      return callback();
    } 
      const data = { code };
      this.props
        .dispatch({
          type: 'role/checkUnique',
          payload: data,
        })
        .then(r => {
          if (r.success) {
            return callback();
          } 
            return callback('编码已存在');
          
        });
    
  };

  // 关闭窗口
  handleCloseForm = () => {
    this.props.dispatch({
      type: 'role/updateState',
      payload: {
        modalType: '',
      },
    });
  };

  // 保存
  handleSaveClick = () => {
    const { dispatch, item } = this.props;
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      };
      dispatch({
        type: 'role/save',
        payload: data,
      });
    });
  };

  // 渲染界面
  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalType, item } = this.props;
    const cmView = modalType === 'view';

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const formRowOne = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    };
    return (
      <Modal
        onCancel={() => this.handleCloseForm()}
        visible={modalType !== ''}
        width={600}
        onOk={() => this.handleSaveClick()}
        title={
          modalType === 'create'
            ? '新增角色信息'
            : modalType === 'edit'
              ? '编辑角色信息'
              : '查看角色信息'
        }
      >
        <Form>
          {/* 第一行 */}
          <Row>
            <Col span={12}>
              <FormItem label="角色名称" hasFeedback {...formItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: item.name,
                  rules: [{ required: true, message: '请输入角色名称' }],
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="角色编码" hasFeedback {...formItemLayout}>
                {getFieldDecorator('code', {
                  initialValue: item.code,
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '请输入角色编码' },
                    { validator: this.checkCode },
                  ],
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          {/* 第二行 */}
          <FormItem label="角色描述" hasFeedback {...formRowOne}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  message: '请输入角色描述',
                },
              ],
            })(<Area />)}
          </FormItem>
          {/* 第五行 */}
          {cmView && (
            <Row>
              <Col span={12}>
                <FormItem label="创建人" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="创建时间" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
            </Row>
          )}
          {/* 第六行 */}
          {cmView && (
            <Row>
              <Col span={12}>
                <FormItem label="修改人" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="修改时间" {...formItemLayout}>
                  <Input disabled defaultValue={item.description} />
                </FormItem>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>
    );
  }
}
