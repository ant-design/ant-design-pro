import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Card, Avatar, Popover, Button, Icon, List } from 'antd';
import { linkCopyToClipboard } from '@/utils/utils';

import styles from './Members.less';

@connect(({ activities, loading }) => ({
  activities,
  activitiesLoading: loading.effects['activities/fetchList'],
}))
class Members extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'activities/fetchList',
    });
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleInviteLinkCreate = () => {
    linkCopyToClipboard('link copy success.');
  };

  memberInvite() {
    const { visible } = this.state;

    return (
      <Popover
        placement="bottom"
        content={
          <div>
            <p>
              将下面都链接发送给你想要邀请的人，任何点开该链接的人都可以申请加入团队。
              <br />
              https://abc.com?invite=sbdk12dasdj
            </p>
            <Button onClick={this.handleInviteLinkCreate} type="primary" block>
              复制链接
            </Button>
          </div>
        }
        title="邀请链接"
        trigger="click"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button>
          <Icon type="plus" /> 邀请成员
        </Button>
      </Popover>
    );
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;

    return list.map(item => (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
            </span>
          }
          description={
            <span className={styles.membertype} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    ));
  }

  render() {
    const { activitiesLoading } = this.props;

    return (
      <div className={styles.membersList}>
        <Card
          bodyStyle={{ padding: 0 }}
          bordered={false}
          className={styles.activeCard}
          extra={this.memberInvite()}
          title="易崛企（共1人）"
          loading={activitiesLoading}
        >
          <List loading={activitiesLoading} size="large">
            <div className={styles.activitiesList}>{this.renderActivities()}</div>
          </List>
        </Card>
      </div>
    );
  }
}

export default Members;
