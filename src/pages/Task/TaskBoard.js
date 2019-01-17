import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, List } from 'antd';
import styles from './TaskBoard.less';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class TaskBoard extends PureComponent {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.kanban}>
        <div className={styles.listContainer}>
          <div className={styles.listGroup}>
            <Card bodyStyle={{ padding: 0, height: '100%' }} bordered={false} title="列表">
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
            </Card>
          </div>
          <div className={styles.listGroup}>
            <Card bodyStyle={{ padding: 0, height: '100%' }} bordered={false} title="列表">
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
            </Card>
          </div>
          <div className={styles.listGroup}>
            <Card bodyStyle={{ padding: 0, height: '100%' }} bordered={false} title="列表">
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
            </Card>
          </div>
          <div className={styles.listGroup}>
            <Card bodyStyle={{ padding: 0, height: '100%' }} bordered={false} title="列表">
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
            </Card>
          </div>
          <div className={styles.listGroup}>
            <Card bodyStyle={{ padding: 0, height: '100%' }} bordered={false} title="列表">
              <List size="small">
                <List.Item className={styles.ListItem}>
                  <List.Item.Meta
                    avatar={<Avatar src="" className={styles.avatarPic} />}
                    title="名称"
                    description={<span className={styles.membertype}>描述</span>}
                  />
                </List.Item>
              </List>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskBoard;
