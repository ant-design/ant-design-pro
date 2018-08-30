import React, { Component } from 'react';
import { Card, Input, Badge, Button, Table, Form, Row, Col, Select, Divider, Icon } from 'antd';
import { connect } from 'dva';
import style from './Index.less';

import DictItem from './DictItem';

const FormItem = Form.Item;
const Area = Input.TextArea;
const Option = Select.Option;

@Form.create()
@connect(({ loading }) => ({
  submitting: loading.effects['dict/submit'],
}))
export default class DictDetail extends Component {
  // 校验编码唯一性
  checkUnique = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    const { currentItem, codeUnique } = this.props;

    const code = getFieldValue('code');
    const id = currentItem.id;

    this.props
      .dispatch({
        type: 'dict/checkUnique',
        payload: {
          id,
          code,
        },
      })
      .then(() => {
        if (!codeUnique) {
          return callback('已存在该编码');
        } 
          return callback();
        
      });
  };

  // 新增字典项
  handleAddClick = () => {
    this.props.dispatch({
      type: 'dict/updateState',
      payload: {
        itemOperateType: 'itemCreate',
      },
    });
  };

  // 编辑事件
  handleEditClick = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'dict/updateState',
      payload: {
        itemValues: record,
        itemOperateType: 'itemEdit',
      },
    });
  };

  // 保存
  handleTypeSaveClick = () => {
    const { dispatch, currentItem } = this.props;
    const { getFieldsValue, validateFields } = this.props.form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: currentItem.id,
      };
      dispatch({
        type: 'dict/editDict',
        payload: data,
      });
    });
  };

  // 删除事件
  handleDeleteClick = record => {
    const { dispatch } = this.props;

    dispatch({
      type: 'dict/deleteDictItem',
      payload: { id: record.id },
    });
  };

  render() {
    const { dispatch, currentItem, operateType, data, itemOperateType, itemValues } = this.props;
    const { getFieldDecorator } = this.props.form;

    const itemProps = {
      dispatch,
      itemList: currentItem.items,
      mainId: currentItem.id,
      itemOperateType,
      itemValues,
    };

    const formRowOne = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    // 获得根分类
    const options = data ? data.map(i => <Option key={i.id}>{i.name}</Option>) : '';
    const column = [
      {
        title: 'Key',
        dataIndex: 'keyName',
      },
      {
        title: 'Value',
        dataIndex: 'keyValue',
      },
      {
        title: '排序',
        dataIndex: 'orders',
      },
      {
        title: '是否可用',
        dataIndex: 'enable',
        render: (text, record) => record.status === '0001' ? (
          <Badge status="success" text="正常" />
          ) : (
            <Badge status="error" text="停用" />
          ),
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a onClick={e => this.handleEditClick(record, e)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={e => this.handleDeleteClick(record, e)}>删除</a>
          </div>
        ),
      },
    ];
    // 表单动态按钮
    const extraContent =
      operateType === 'typeCreate' || !!currentItem.id ? (
        <Button type="primary" onClick={() => this.handleTypeSaveClick()}>
          保存
        </Button>
      ) : (
        ''
      );

    return (
      <div>
        <Row className={style.dict_right_form_title}>
          <Col span={24}>
            <Card
              className={style.dict_right_form}
              bordered={false}
              bodyStyle={{ padding: '0 0 0 0' }}
              title="分类信息"
              extra={extraContent}
            />
          </Col>
        </Row>
        <Form className={style.dict_form_item} layout="horizontal">
          <FormItem label="归属分类" {...formRowOne} style={{ marginBottom: 6 }}>
            {getFieldDecorator('parentId', {
              initialValue: currentItem.parentId,
              rules: [
                {
                  required: true,
                  message: '请选择归属分类',
                },
              ],
            })(
              <Select disabled={operateType === '' || currentItem.parentId === '0'}>
                {options}
              </Select>
            )}
          </FormItem>
          {/* 第二行 */}
          <FormItem wrapperCol={{ span: 24 }} style={{ marginBottom: 30 }}>
            <Col span={12}>
              <FormItem label="编码" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('code', {
                  initialValue: currentItem.code,
                  validateTrigger: 'onBlur',
                  rules: [
                    {
                      required: true,
                      message: '请输入编码',
                    },
                    {
                      validator: this.checkUnique,
                    },
                  ],
                })(<Input disabled={operateType === ''} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="描述" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                {getFieldDecorator('name', {
                  initialValue: currentItem.name,
                  rules: [
                    {
                      required: true,
                      message: '请输入字典项',
                    },
                  ],
                })(<Input disabled={operateType === ''} />)}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem label="备注" {...formRowOne}>
            {getFieldDecorator('remark', {
              initialValue: currentItem.remark,
            })(<Area disabled={operateType === ''} />)}
          </FormItem>
        </Form>
        <Divider />
        <Card
          className={style.dict_right_form}
          bordered={false}
          bodyStyle={{ padding: '0 0 0 0' }}
          title="字典项"
          extra={
            <Button disabled={!currentItem.id} onClick={() => this.handleAddClick()} type="primary">
              <Icon type="edit" />
              新增
            </Button>
          }
        />
        <Table
          rowKey={record => record.id}
          rowClassName={record => record.status === '0000' ? style.disabled : style.enabled}
          columns={column}
          dataSource={currentItem.items}
          pagination={false}
          size="small"
        />
        {itemOperateType && <DictItem {...itemProps} />}
      </div>
    );
  }
}
