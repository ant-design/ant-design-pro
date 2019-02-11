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

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
@Form.create()
class Home extends PureComponent {
  state = {};

  componentDidMount() {
    const { dispatch } = this.props;
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
      list: { list },
      loading,
    } = this.props;

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

    const data = {
      menu: {
        name: '项目',
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
        name: '分组',
        list: [
          {
            id: 'parent1',
            name: '父分组1',
            child: [
              {
                id: 'child1',
                name: 'child1',
                child: [
                  {
                    id: 'grand child1',
                    name: 'grand child1',
                    child: [],
                  },
                  {
                    id: 'grand child2',
                    name: 'grand child2',
                    child: [],
                  },
                ],
              },
              {
                id: 'child2',
                name: 'child2',
                child: [
                  {
                    id: 'grand child1',
                    name: 'grand child1',
                    child: [],
                  },
                  {
                    id: 'grand child2',
                    name: 'grand child2',
                    child: [],
                  },
                ],
              },
            ],
          },
          {
            id: 'parent5',
            name: '父分组5',
            child: [
              {
                id: 'child6',
                name: 'child6',
                child: [
                  {
                    id: 'grand child7',
                    name: 'grand child7',
                    child: [],
                  },
                  {
                    id: 'grand child8',
                    name: 'grand child8',
                    child: [],
                  },
                ],
              },
              {
                id: 'child9',
                name: 'child9',
                child: [
                  {
                    id: 'grand child10',
                    name: 'grand child10',
                    child: [],
                  },
                  {
                    id: 'grand child11',
                    name: 'grand child11',
                    child: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    };

    return (
      <Row style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Col span={6} style={{ paddingRight: '5px' }}>
          <MulitTree data={data} handlers={this.groupSelectHandler} />
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
                loading={loading}
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
