import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Popover, Button, Icon, List, Row, Col } from 'antd';
import { linkCopyToClipboard } from '@/utils/utils';
import styles from './MembersPlus.less';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/members'],
  linkLoading: loading.effects['team/membersInvite'],
}))
class MembersPlus extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/members',
    });
    dispatch({
      type: 'team/memberInvite',
    });
  }

  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  handleInviteLinkCreate = link => {
    linkCopyToClipboard(link);
  };

  IconClick = e => {
    e.stopPropagation();
  };

  handleClick = () => {};

  memberInvite() {
    const { visible } = this.state;
    const {
      team: { inviteToken, status },
    } = this.props;
    const domain = window.location.host;
    const uri = '/user/join?invite=';

    return status === '__OK__' ? (
      <Popover
        placement="bottom"
        content={
          <div className={styles.inviteLink}>
            <p>
              将下面都链接发送给你想要邀请的人，任何点开该链接的人都可以申请加入团队。
              <br />
              {`${domain}${uri}${inviteToken}`}
            </p>
            <Button
              onClick={() => {
                this.handleInviteLinkCreate(`${domain}${uri}${inviteToken}`);
              }}
              type="primary"
              block
            >
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
    ) : (
      <div />
    );
  }

  childDom(item) {
    if (item.length !== 0) {
      return item.map(items => (
        <div className={styles.treeNode} key={items.name}>
          <div className={styles.nodeCard} onClick={() => this.handleClick()}>
            <Icon type="user" className={styles.secIcon} />
            <span>{items.name}</span>
            {items.child.length !== 0 ? (
              <Icon
                type="down-circle"
                className={styles.stateIcon}
                onClick={e => this.IconClick(e)}
              />
            ) : null}
          </div>
          {items.child.length !== 0 ? this.childDom(items.child) : null}
        </div>
      ));
    }
    return null;
  }

  renderMenu = () => {
    const data = [
      {
        text: '所用成员',
      },
      {
        text: '新加入成员',
      },
      {
        text: '未分配部门成员.',
      },
      {
        text: '停用成员.',
      },
    ];
    return data.map(item => (
      <List.Item key={item.text} className={styles.memberList} style={{ border: 'none' }}>
        <Icon type="user" className={styles.listIcon} />
        {item.text}
      </List.Item>
    ));
  };

  renderSection() {
    const data = [
      {
        name: 'parent1',
        child: [
          {
            name: 'child1',
            child: [
              {
                name: 'grand child1',
                child: [],
              },
              {
                name: 'grand child2',
                child: [],
              },
            ],
          },
          {
            name: 'child2',
            child: [
              {
                name: 'grand child1',
                child: [],
              },
              {
                name: 'grand child2',
                child: [],
              },
            ],
          },
        ],
      },
    ];
    return data.map(item => (
      <div className={styles.treeNode} key={item.name}>
        <div className={styles.nodeCard} onClick={() => this.handleClick()}>
          <Icon type="team" className={styles.secIcon} />
          <span>{item.name}</span>
          {item.child.length !== 0 ? (
            <Icon
              type="down-circle"
              className={styles.stateIcon}
              onClick={e => this.IconClick(e)}
            />
          ) : null}
        </div>
        {this.childDom(item.child)}
      </div>
    ));
  }

  renderActivities() {
    const {
      team: { members },
    } = this.props;

    return members.map(item => (
      <List.Item className={styles.ListItem} key={item.user_id}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} className={styles.avatarPic} />}
          title={
            <span>
              <a className={styles.username}>{item.name}</a>
            </span>
          }
          description={<span className={styles.membertype}>{item.team_role_desc}</span>}
        />
      </List.Item>
    ));
  }

  render() {
    const {
      team: { total },
      teamLoading,
    } = this.props;

    return (
      <div className={styles.content}>
        <Row className={styles.membersList}>
          <Col span={6} className={styles.listCol}>
            <Card className={styles.listCard}>
              <div className={styles.mune}>
                <div className={styles.title}>成员</div>
                <List loading={teamLoading}>{this.renderMenu()}</List>
                <div className={styles.title}>部门</div>

                <div className={styles.tree}>{this.renderSection()}</div>
              </div>
            </Card>
          </Col>

          <Col span={18} className={styles.cardCol}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              extra={this.memberInvite()}
              title={`共${total}人`}
              loading={teamLoading}
            >
              <List loading={teamLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MembersPlus;
