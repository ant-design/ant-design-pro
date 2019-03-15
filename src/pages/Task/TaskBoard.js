import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Button,
  Card,
  Checkbox,
  Icon,
  Menu,
  Dropdown,
  Avatar,
  Skeleton,
  List,
  Form,
  Input,
  Modal,
  DatePicker,
  TreeSelect,
} from 'antd';
import styles from './TaskBoard.less';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class TaskBoard extends PureComponent {
  state = {
    value: undefined,
  };

  componentDidMount() {}

  deleteCard = id => {
    console.log(id);
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  randerTreeSect = () => {
    const { value } = this.state;
    const treeData = [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-1',
            key: '0-0-1',
          },
          {
            title: 'Child Node2',
            value: '0-0-2',
            key: '0-0-2',
          },
        ],
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
      },
    ];

    return (
      <TreeSelect
        style={{ width: 300 }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="Please select"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  };

  renderCard = () => {
    const list = [
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work1',
        title: 'work',
        name: 'work1',
      },
      {
        id: 'work2',
        title: 'work',
        name: 'work2',
      },
    ];
    return (
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            style={{ backgroundColor: '#fff', padding: '12px 15px' }}
            onClick={this.showModal}
          >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar=<Checkbox />
                title={<a href="https://ant.design">{item.name}</a>}
                description="上周四截止"
              />
              <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  };

  render() {
    const { visible } = this.state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const ModelContent = (
      <Form>
        <Form.Item {...formItemLayout} label="工作人员">
          {this.randerTreeSect}
        </Form.Item>
        <Form.Item {...formItemLayout} label="截止日期">
          <RangePicker />
        </Form.Item>
        <Form.Item {...formItemLayout} label="任务描述">
          <TextArea rows={2} placeholder="请输入项目描述" />
        </Form.Item>
      </Form>
    );
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <a
            onClick={() => {
              this.addCardList();
            }}
          >
            <Icon type="edit" />
            &nbsp;重命名
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          <a
            onClick={() => {
              this.addCardList();
            }}
          >
            <Icon type="close" />
            &nbsp;删除列表
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.kanban}>
        <div className={styles.listContainer}>
          <div className={styles.listGroup}>
            <Card
              bordered={false}
              title="项目列表生生世世生生世世生生世世生生世世生生世世"
              extra={
                <span>
                  <a href="#" style={{ padding: '0px 5px' }}>
                    <Icon type="plus-circle" />
                  </a>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" href="#">
                      <Icon type="dash" />
                    </a>
                  </Dropdown>
                </span>
              }
              bodyStyle={{ padding: 0 }}
            />
            <div className={styles.cardList}>{this.renderCard()}</div>
          </div>

          <div className={styles.listGroup}>
            <Button
              type="dashed"
              style={{ width: '100%', height: '55px' }}
              onClick={this.projectCreate}
              icon="plus"
            >
              新建列表
            </Button>
          </div>
        </div>
        <Modal title="任务详情" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          {ModelContent}
        </Modal>
      </div>
    );
  }
}

export default TaskBoard;
