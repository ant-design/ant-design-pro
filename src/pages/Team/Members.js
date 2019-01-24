import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Popover, Button, Icon, List, Row, Col, Menu, Dropdown } from 'antd';
import { linkCopyToClipboard } from '@/utils/utils';
import styles from './Members.less';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/members'],
  linkLoading: loading.effects['team/membersInvite'],
}))
class Members extends PureComponent {
  state = {
    visible: false,
    click: { all: true },
    toggle: {},
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

  IconClick = (e, item) => {
    const { id } = item;
    const { toggle } = this.state;
    e.stopPropagation();
    toggle[id] = !toggle[id];
    this.setState(toggle);
  };

  handleDepartmentSelect = () => {};

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

  childDom(items, count) {
    let cou = count;
    cou += 1;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a href="">
            <Icon type="plus-square" className={styles.menuIcon} />
            增加分组
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a href="">
            <Icon type="close-circle" className={styles.menuIcon} />
            删除分组
          </a>
        </Menu.Item>
      </Menu>
    );
    const { toggle } = this.state;
    const { click } = this.state;

    if (items.length !== 0) {
      return items.map(item => (
        <div className={styles.treeNode} key={item.name}>
          <div
            className={click[item.id] ? styles.nodeCardClick : styles.nodeCard}
            style={{ paddingLeft: `${cou * 10 + 15}px` }}
            onClick={() => this.handleDepartmentSelect(item)}
          >
            {item.child.length !== 0 ? (
              <Icon
                type={toggle[item.id] ? 'down-circle' : 'right-circle'}
                theme="filled"
                className={styles.secIcon}
                onClick={e => this.IconClick(e, item)}
              />
            ) : null}
            <span>{item.name}</span>
            <Dropdown overlay={menu} trigger={['click']}>
              <Icon type="ellipsis" className={styles.dropIcon} />
            </Dropdown>
          </div>
          {item.child.length !== 0 && toggle[item.id] ? this.childDom(item.child, cou) : null}
        </div>
      ));
    }
    return null;
  }

  renderMenu = () => {
    const { click } = this.state;
    const data = [
      {
        id: 'all',
        text: '所用成员',
      },
      {
        id: 'new',
        text: '新加入成员',
      },
      {
        id: 'noWork',
        text: '未分配部门成员',
      },
      {
        id: 'block',
        text: '停用成员',
      },
    ];
    return data.map(item => (
      <div
        key={item.id}
        className={click[item.id] ? styles.nodeCardClick : styles.nodeCard}
        onClick={() => this.handleDepartmentSelect(item)}
      >
        <Icon type="user" className={styles.secIcon} />
        {item.text}
      </div>
    ));
  };

  renderSection() {
    const data = [
      {
        id: 'parent1',
        name: 'parent1',
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
    ];
    return this.childDom(data, 0);
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

export default Members;
