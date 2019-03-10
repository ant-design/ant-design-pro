import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Checkbox, Icon, Menu, Dropdown, Avatar, Skeleton, List } from 'antd';
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
        <Menu.Item key="0">
          <a
            onClick={() => {
              this.addCardList();
            }}
          >
            <Icon type="plus" />
            &nbsp;新建任务
          </a>
        </Menu.Item>
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
            <div className={styles.listTitle}>
              <h4 title="任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一">
                任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一
              </h4>
              <div className={styles.iconBox}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" href="#">
                    <Icon type="small-dash" />
                  </a>
                </Dropdown>
              </div>
            </div>

            <div className={styles.cardList}>{this.renderCard()}</div>
          </div>

          <div className={styles.listGroup}>
            <div className={styles.listTitle}>
              <h4 title="任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一">
                任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一
              </h4>
              <div className={styles.iconBox}>
                <Icon type="dash" className={styles.titleIcon} />
              </div>
            </div>
            <div className={styles.cardList}>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox disabled />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
                <div className={styles.endTime}>
                  <span className={styles.overdue}>
                    <i>上周四</i> 截止
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listGroup}>
            <div className={styles.add}>
              <Icon type="plus" />
              <span>新建列表</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskBoard;
