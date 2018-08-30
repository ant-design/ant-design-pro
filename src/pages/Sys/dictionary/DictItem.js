import React from 'react';
import { Form, Input, Modal, Col, InputNumber, Switch } from 'antd';

const TextArea = Input.TextArea;
const FormItem = Form.Item;

@Form.create()
export default class DictItem extends React.PureComponent {
  // 校验key唯一
  checkUnique = (r, value, callback) => {
    const { itemList, itemValues } = this.props;

    const exist = itemList.find(v => value === v.keyName && v.id !== itemValues.id);

    if (exist) {
      return callback('字典项已存在');
    } 
      return callback();
    
  };

  // 保存子表
  handleSubmit = () => {
    const { getFieldsValue, validateFields } = this.props.form;
    const { mainId, itemValues } = this.props;
    const that = this;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
      };
      data.status = data.status ? '0001' : '0000';
      data.mainId = mainId;
      data.id = itemValues.id;

      that.props.dispatch({
        type: 'dict/editDictItem',
        payload: data,
      });
    });
  };

  // 关闭窗口
  handleCloseForm = () => {
    this.props.dispatch({
      type: 'dict/updateState',
      payload: {
        itemOperateType: '',
      },
    });
  };

  render() {
    const formRowOne = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    const { itemOperateType, itemValues } = this.props;

    return (
      <Modal
        title={itemOperateType === 'edit' ? '字典项编辑' : '字典项新增'}
        visible
        onCancel={() => this.handleCloseForm()}
        onOk={() => this.handleSubmit()}
      >
        <Form>
          <FormItem label="字典项" {...formRowOne} style={{ marginBottom: 5 }}>
            {getFieldDecorator('keyName', {
              initialValue: itemValues.keyName,
              validateTrigger: 'onBlur',
              rules: [{ required: true, message: '请输入Key' }, { validator: this.checkUnique }],
            })(<Input />)}
          </FormItem>
          <FormItem label="字典值" {...formRowOne} style={{ marginBottom: 5 }}>
            {getFieldDecorator('keyValue', {
              initialValue: itemValues.keyValue,
              rules: [{ required: true, message: '请输入值' }],
            })(<Input />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 24 }} style={{ marginBottom: 30 }}>
            <Col span={12}>
              <FormItem label="排序" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('orders', {
                  initialValue: itemValues.orders,
                })(<InputNumber />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="状态" labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
                {getFieldDecorator('status', {
                  valuePropName: 'checked',
                  initialValue: itemValues.status !== '0000',
                })(<Switch checkedChildren="启用" unCheckedChildren="停用" />)}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem label="备注" {...formRowOne}>
            {getFieldDecorator('remark')(<TextArea />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
