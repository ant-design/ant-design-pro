import React, { PureComponent, Fragment } from 'react';
import { Button, Col, Form, Icon, Input, Row, Select, Table, Modal, Divider } from 'antd';
import styles from './Resource.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const columns = [{
  title: '菜单',
  dataIndex: 'menu',
  key: 'menu',
  width: '20%',
}, {
  title: '层级&排序',
  dataIndex: 'key',
  key: 'key',
  width: '20%',
}, {
  title: '权限',
  dataIndex: 'permission',
  key: 'permission',
  width: '20%',
}, {
  title: 'URL',
  dataIndex: 'url',
  key: 'url',
  width: '20%',
}, {
  title: '操作',
  render: () => (
    <Fragment>
      <a href="">编辑</a>
      <Divider type="vertical" />
      <a href="">删除</a>
    </Fragment>
  ),
  width: '20%',
}];
const data = [{
  key: 1,
  menu: 'John Brown sr.',
  permission: 60,
  url: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    menu: 'John Brown',
    permission: 42,
    url: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    menu: 'John Brown jr.',
    permission: 30,
    url: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      menu: 'Jimmy Brown',
      permission: 16,
      url: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    menu: 'Jim Green sr.',
    permission: 72,
    url: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      menu: 'Jim Green',
      permission: 42,
      url: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        menu: 'Jim Green jr.',
        permission: 25,
        url: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        menu: 'Jimmy Green sr.',
        permission: 18,
        url: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  menu: 'Joe Black',
  permission: 32,
  url: 'Sidney No. 1 Lake Park',
}];
const CreateForm = Form.create()((props) => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="描述"
      >
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Input placeholder="请输入" />
        )}
      </FormItem>
    </Modal>
  );
});

@Form.create()
export default class Resource extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
  };

  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    });
  }

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="菜单">
              {getFieldDecorator('no')(
                <Input
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户">
              {getFieldDecorator('status')(
                <Input
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="群组">
              {getFieldDecorator('no')(
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={
                    (input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="用户">
              {getFieldDecorator('status')(
                <Input
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('number')(
                <Select
                  showSearch
                  placeholder="Select a person"
                  optionFilterProp="children"
                  filterOption={
                    (input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="菜单">
              {getFieldDecorator('date')(
                <Input
                  placeholder="请输入"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { modalVisible } = this.state;
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    return (
      <PageHeaderLayout title="资源列表">
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>
            {this.renderForm()}
          </div>
          <div className={styles.standardTable}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            <Table
              columns={columns}
              dataSource={data}
            />
          </div>
        </div>
        <CreateForm
          {...parentMethods}
          modalVisible={modalVisible}
        />
      </PageHeaderLayout>
    );
  }
}
