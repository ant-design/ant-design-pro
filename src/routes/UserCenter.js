import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import numeral from 'numeral';
import { List, Card, Row, Col, Icon, Dropdown,
  Menu, Avatar, Tag, Divider, Tooltip, Spin } from 'antd';
import AvatarList from '../components/AvatarList';
import { formatWan } from '../utils/utils';
import styles from './UserCenter.less';
import stylesArticles from './List/Articles.less';
import stylesApplications from './List/Applications.less';
import stylesProjects from './List/Projects.less';

@connect(({ list, loading, user, project }) => ({
  list,
  listLoading: loading.effects['list/fetch'],
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  project,
  projectLoading: loading.effects['project/fetchNotice'],
}))
export default class UserCenter extends PureComponent {
  state = {
    key: 'article',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
    dispatch({
      type: 'project/fetchNotice',
    });
  }

  onTabChange = (key) => {
    this.setState({ key });
  }

  renderArticles = (list, loading) => {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={stylesArticles.listContent}>
        <div className={stylesArticles.description}>{content}</div>
        <div className={stylesArticles.extra}>
          <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
        </div>
      </div>
    );
    return (
      <List
        size="large"
        className={styles.articleList}
        loading={loading}
        rowKey="id"
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="star-o" text={item.star} />,
              <IconText type="like-o" text={item.like} />,
              <IconText type="message" text={item.message} />,
            ]}
          >
            <List.Item.Meta
              title={(
                <a className={stylesArticles.listItemMetaTitle} href={item.href}>{item.title}</a>
              )}
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </span>
              }
            />
            <ListContent data={item} />
          </List.Item>
        )}
      />
    );
  }

  renderApplications = (list, loading) => {
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
        </Menu.Item>
      </Menu>
    );
    const CardInfo = ({ activeUser, newUser }) => (
      <div className={stylesApplications.cardInfo}>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
        </div>
      </div>
    );
    return (
      <List
        rowKey="id"
        className={stylesApplications.filterCardList}
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        loading={loading}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip title="下载"><Icon type="download" /></Tooltip>,
                <Tooltip title="编辑"><Icon type="edit" /></Tooltip>,
                <Tooltip title="分享"><Icon type="share-alt" /></Tooltip>,
                <Dropdown overlay={itemMenu}><Icon type="ellipsis" /></Dropdown>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />
              <div className={stylesApplications.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }

  renderProjects = (list, loading) => {
    return (
      <List
        className={stylesProjects.coverCardList}
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Card
              className={stylesProjects.card}
              hoverable
              cover={<img alt={item.title} src={item.cover} height={154} />}
            >
              <Card.Meta
                title={<a href="#">{item.title}</a>}
                description={item.subDescription}
              />
              <div className={stylesProjects.cardItemContent}>
                <span>{moment(item.updatedAt).fromNow()}</span>
                <div className={stylesProjects.avatarList}>
                  <AvatarList size="mini">
                    {
                      item.members.map(member => (
                        <AvatarList.Item
                          key={`${item.id}-avatar-${member.id}`}
                          src={member.avatar}
                          tips={member.name}
                        />
                      ))
                    }
                  </AvatarList>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }

  render() {
    const { list: { list }, listLoading, currentUser, currentUserLoading,
      project: { notice }, projectLoading } = this.props;
    const operationTabList = [{
      key: 'article',
      tab: '文章（8）',
    }, {
      key: 'application',
      tab: '应用（8）',
    }, {
      key: 'project',
      tab: '项目（8）',
    }];
    const contentMap = {
      article: this.renderArticles(list, listLoading),
      application: this.renderApplications(list, listLoading),
      project: this.renderProjects(list, listLoading),
    };

    return (
      <div className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{ marginBottom: 24 }}
              loading={currentUserLoading}
            >
              {
                currentUser && Object.keys(currentUser).length ?
                  (
                    <div>
                      <div className={styles.avatarHolder}>
                        <img alt="" src={currentUser.avatar} />
                        <div className={styles.name}>{currentUser.name}</div>
                        <div>{currentUser.signature}</div>
                      </div>
                      <div className={styles.detail}>
                        <p><i className={styles.title} />{currentUser.title}</p>
                        <p><i className={styles.group} />{currentUser.group}</p>
                        <p><i className={styles.address} />
                          {currentUser.geographic.province.label}
                          {currentUser.geographic.city.label}
                        </p>
                      </div>
                      <Divider dashed />
                      <div className={styles.tags}>
                        <div className={styles.tagsTitle}>标签</div>
                        {
                          currentUser.tags.map(item => <Tag key={item.key}>{item.label}</Tag>)
                        }
                        <Tag style={{ background: '#fff', borderStyle: 'dashed' }}>
                          <Icon type="plus" />
                        </Tag>
                      </div>
                      <Divider dashed />
                      <div className={styles.team}>
                        <div className={styles.teamTitle}>团队</div>
                        <Spin spinning={projectLoading}>
                          <Row gutter={36}>
                            {
                              notice.map(item => (
                                <Col key={item.id} className={styles.item} lg={24} xl={12}>
                                  <Avatar size="small" src={item.logo} />
                                  {item.member}
                                </Col>
                              ))
                            }
                          </Row>
                        </Spin>
                      </div>
                    </div>
                  ) : 'loading...'
              }
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onTabChange}
            >
              {contentMap[this.state.key]}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
