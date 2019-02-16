import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
} from 'antd';

import styles from './Home.less';
import MulitTree from '@/components/MulitTree';

@connect(({ list, project, loading }) => ({
  list,
  project,
  projectsLoading: loading.models.list,
}))
@Form.create()
class Home extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/groupTree',
    });

    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  groupSelectHandler = item => {
    console.log(item);
  };

  groupCreateHandler = (name, id) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'project/groupCreate',
      payload: {
        group_name: name,
        parent_node: id,
      },
    });
  };

  groupDelete = item => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: '删除',
      content: (
        <div>
          确定删除 <b>{item.name}</b> 吗？删除后该分组的项目将被转存到未分组!
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'project/groupDelete',
          payload: {
            project_group_id: item.id,
          },
        });
      },
    });
  };

  showEditModal = item => {
    console.log(item);
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const {
      project: { tree },
      list: { list },
      projectsLoading,
    } = this.props;

    const data = {
      menu: {
        name: '常用',
        list: [
          {
            id: 'all',
            icon: 'bars',
            text: '所有项目',
          },
          {
            id: 'star',
            icon: 'star',
            text: '我的标星',
          },
          {
            id: 'unsort',
            icon: 'menu-fold',
            text: '未分组',
          },
        ],
      },
      tree: {
        name: '项目组',
        list: tree,
      },
    };

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const ListContent = ({ data: { percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">移动到</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <Row style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Col span={6} style={{ paddingRight: '10px' }}>
          <MulitTree
            data={data}
            onItemSelect={this.groupSelectHandler}
            onGroupCreate={this.groupCreateHandler}
            onGroupDelete={this.groupDelete}
          />
        </Col>
        <Col span={18}>
          <div className={styles.standardList}>
            <Card bordered={false} title="项目列表" bodyStyle={{ padding: '0 32px 40px 32px' }}>
              <Button type="dashed" style={{ width: '100%', marginBottom: 8 }} icon="plus">
                添加
              </Button>
              <List
                size="large"
                rowKey="id"
                loading={projectsLoading}
                dataSource={list}
                renderItem={item => (
                  <List.Item actions={[<MoreBtn current={item} />]}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo} shape="square" size="large" />}
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.subDescription}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Home;
