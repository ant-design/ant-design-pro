import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Tree, Row, Col, Card, Form, Input, Icon, Button, Popconfirm } from 'antd';
import AccountList from './List';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import Page from '@/components/Page';
import AOEForm from './AOEForm';
import styles from './Index.less';

const FormItem = Form.Item;
const { TreeNode } = { ...Tree };

// 连接组件和store
// 把state.goods定给组件的goods
@connect(state => ({
  account: state.account,
}))
@Form.create()
export default class Account extends PureComponent {
  // 组件加载完成后加载数据
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/fetch',
    });
  }
  // 树节点选择
  onSelect = selectedKeys => {
    const { dispatch } = this.props;
    const values = {
      deptId: selectedKeys[0],
    };
    dispatch({
      type: 'account/fetchUser',
      payload: values,
    });
  };
  // 重置事件
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'account/fetchUser',
      payload: {},
    });
  };
  // 解锁/锁定
  handleLockSwitch = status => {
    const { account: { selectedRowKeys } } = this.props;
    this.props.dispatch({
      type: 'account/lockSwitch',
      payload: {
        param: selectedRowKeys,
        status,
      },
    });
  };

  // 批量删除
  handleRemoveClick = () => {
    const { dispatch, account: { selectedRowKeys } } = this.props;
    if (!selectedRowKeys) return;

    dispatch({
      type: 'account/remove',
      payload: {
        param: selectedRowKeys,
      },
    });
  };
  // 搜索事件
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    // 表单验证
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      dispatch({
        type: 'account/fetchUser',
        payload: values,
      });
    });
  };
  // 新增窗口
  handleModalVisible = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/updateState',
      payload: {
        modalType: 'create',
        currentItem: {},
      },
    });
  };
  // 渲染树节点
  renderTreeNodes(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} value={item.id}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} value={item.id} />;
    });
  }
  // 左侧树
  renderCategoryTree() {
    const { orgData } = this.props.account;
    return (
      <Card className={styles.leftTree}>
        <div className={styles.goodsInfoCategory}>
          <Icon type="tags" />归属部门
        </div>
        <Tree showLine onSelect={this.onSelect}>
          {this.renderTreeNodes(orgData)}
        </Tree>
      </Card>
    );
  }
  renderLeftBtn() {
    const { selectedRowKeys } = this.props.account;

    return (
      <div>
        <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, 'create')}>
          新增用户
        </Button>
        {selectedRowKeys.length > 0 && (
          <Button
            icon="lock"
            type="normal"
            style={{ marginLeft: 8 }}
            onClick={() => this.handleLockSwitch(1)}
          >
            锁定
          </Button>
        )}
        {selectedRowKeys.length > 0 && (
          <Button
            icon="unlock"
            type="danger"
            style={{ marginLeft: 8 }}
            onClick={() => this.handleLockSwitch(0)}
          >
            解锁
          </Button>
        )}
        {selectedRowKeys.length > 0 && (
          <span>
            <Popconfirm
              title="确定要删除所选用户吗?"
              placement="top"
              onConfirm={this.handleRemoveClick}
            >
              <Button style={{ marginLeft: 8 }} type="danger" icon="remove">
                删除用户
              </Button>
            </Popconfirm>
          </span>
        )}
      </div>
    );
  }
  renderRightBtn() {
    return (
      <div>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
          重置
        </Button>
      </div>
    );
  }
  // 简单搜索条件
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="帐号">
              {getFieldDecorator('account')(<Input placeholder="输入帐号搜索" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="输入用户名称搜索" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机">
              {getFieldDecorator('tel')(<Input placeholder="输入手机号搜索" />)}
            </FormItem>
          </Col>
        </Row>
        <Card
          bordered={false}
          className={styles.noPadding}
          title={this.renderLeftBtn()}
          extra={this.renderRightBtn()}
        />
      </Form>
    );
  }
  // 渲染界面
  render() {
    const { dispatch } = this.props;
    const { loading, list, pagination, selectedRowKeys, orgData, modalType, currentItem } = this.props.account;

    const listPops = {
      dispatch,
      loading,
      list,
      pagination,
      selectedRowKeys,
    };

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      orgData,
      modalType,
      dispatch,
      maskClosable: false,
      title: `${modalType === 'create' ? '新增用户' : '编辑用户'}`,
    };

    return (
      <PageHeaderLayout title="用户信息管理">
        <Page inner>
          <Row gutter={24} className={styles.flex_stretch}>
            {/* 左侧树 */}
            <Col xl={6} lg={6} md={6} sm={6} xs={6} className={styles.fullHeightCol}>
              {this.renderCategoryTree()}
            </Col>
            {/* 右侧列表 */}
            <Col xl={18} lg={18} md={18} sm={18} xs={18}>
              <Card bordered={false}>
                <div className={styles.goodsInfoList}>
                  <div className={styles.goodsInfoListForm}>{this.renderSimpleForm()}</div>
                  <AccountList {...listPops} />
                </div>
              </Card>
            </Col>
          </Row>
          {/* 新增窗口 */}
          {'' !== modalType && <AOEForm {...modalProps} />}
        </Page>
      </PageHeaderLayout>
    );
  }
}
