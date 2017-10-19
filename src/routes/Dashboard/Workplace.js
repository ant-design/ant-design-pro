import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Icon } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';

import styles from './Workplace.less';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

const members = [
  {
    id: 'members-1',
    title: '凤蝶精英小分队',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/CRxBvUggxBYzWBTGmkxF.png',
    link: '',
  },
  {
    id: 'members-2',
    title: 'Ant Design',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/RBytOnluTcyeyDazAbvs.png',
    link: '',
  },
  {
    id: 'members-3',
    title: 'DesignLab',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/HQVJYAXtWHEJvLxQjmPa.png',
    link: '',
  },
  {
    id: 'members-4',
    title: 'Basement',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/HQVJYAXtWHEJvLxQjmPa.png',
    link: '',
  },
  {
    id: 'members-5',
    title: 'Github',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/RBytOnluTcyeyDazAbvs.png',
    link: '',
  },
];

@connect(state => ({
  project: state.project,
  activities: state.activities,
  chart: state.chart,
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {
    const {
      project: { loading: projectLoading, notice },
      activities: { loading: activitiesLoading, list: activitiesList },
      chart: { radarData },
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/XertDCubOxUvZbCdgWTW.png" />
        </div>
        <div className={styles.content}>
          <p className={styles.contentTitle}>早安，曲丽丽，祝你开心每一天</p>
          <p>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
        </div>
      </div>
    );

    const pageHeaderExtra = (
      <div className={styles.pageHeaderExtra}>
        <div>
          <p><Icon type="appstore-o" /> 项目数</p>
          <p>56</p>
          <em />
        </div>
        <div>
          <p><Icon type="trophy" /> 团队内排名</p>
          <p>8<span> / 24</span></p>
          <em />
        </div>
        <div>
          <p><Icon type="eye-o" /> 项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        extraContent={pageHeaderExtra}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {
                notice.map(item => (
                  <Card.Grid className={styles.projectGrid} key={item.id}>
                    <Card bodyStyle={{ padding: 0 }} bordered={false}>
                      <Card.Meta
                        title={(
                          <span className={styles.cardTitle}>
                            <Avatar size="small" src={item.logo} />
                            <Link to={item.href}>{item.title}</Link>
                          </span>
                        )}
                        description={item.description}
                      />
                      <div className={styles.projectItemContent}>
                        <Link to={item.memberLink}>{item.member || ''}</Link>
                        {
                          item.updatedAt && <span>{moment(item.updatedAt).fromNow()}</span>
                        }
                      </div>
                    </Card>
                  </Card.Grid>
                ))
              }
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading}>
                <div className={styles.activitiesList}>
                  {
                    activitiesList.map(item => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.user.avatar} />}
                          title={
                            <p>
                              <a>{item.user.name}</a> 在 <a>xx</a> 新建了项目 <a>xxxx</a>
                            </p>
                          }
                          description={moment(item.updatedAt).fromNow()}
                        />
                      </List.Item>
                    ))
                  }
                </div>
              </List>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup
                onAdd={() => {}}
                links={links}
              />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="xx 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                {
                  <Radar
                    hasLegend
                    height={286}
                    data={radarData}
                  />
                }
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingBottom: 0 }}
              bordered={false}
              title="团队"
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {
                    members.map(item => (
                      <Col span={12} key={`members-item-${item.id}`}>
                        <Link to={item.link}>
                          <img src={item.logo} alt={item.title} />
                          <span>{item.title}</span>
                        </Link>
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
