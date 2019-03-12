import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Checkbox, Icon, Menu, Dropdown, Avatar, Skeleton, List } from 'antd';
import styles from './TaskBoard.less';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class TaskBoard extends PureComponent {
  state = {};

  componentDidMount() {}

  deleteCard = id => {
    console.log(id);
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
          <List.Item style={{ backgroundColor: '#fff', padding: '12px 15px' }}>
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
      </div>
    );
  }
}

export default TaskBoard;
