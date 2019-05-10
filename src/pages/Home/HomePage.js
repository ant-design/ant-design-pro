/* eslint-disable no-console */
import React, { Component } from 'react';
import { Card, Row, Col, Icon, Divider } from 'antd';
import portrait from '@/assets/portrait.png';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';

import styles from './HomePage.less';

@connect(({ home, loading }) => {
  console.log('connect: ', '  home: ', home, '  loading: ', loading);
  return {
    home,
    loading: loading.models.home,
  };
})
class HomePage extends Component {
  state = {};

  componentDidMount() {
    console.log('HomePage  componentDidMount');
    const { dispatch } = this.props;
    console.log('HomePage componentDidMount： ', this.props);
    dispatch({
      type: 'home/fetch',
    });
  }

  render() {
    console.log('render -- this.props: ', this.props);
    const {
      home: { data },
      loading,
    } = this.props;

    console.log('home -- render: ', data);
    // eslint-disable-next-line no-useless-rename
    const { user: user, userinfo: userinfo, barinfo: barinfo } = data.homeData;

    const cardstyle = {
      marginBottom: 24,
      height: 300,
    };

    return (
      <PageHeaderWrapper title="概览">
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card
              // hoverable={config.hoverable}
              // bordered={config.bordered}
              style={cardstyle}
              loading={loading}
            >
              <div className={styles.user}>
                <div className={styles.usertop}>
                  <div className={styles.userinfo}>
                    <img src={portrait} alt="" />
                    <div className={styles.userI}>
                      <div className={styles.username}>
                        <span>{user.name}</span>
                      </div>
                      <div className={styles.userqq}>
                        <span>{user.qq}</span>
                      </div>
                    </div>
                    <div className={styles.exitspan}>
                      <span>退出登录</span>
                    </div>
                  </div>
                </div>
                <Divider style={{ marginTop: 12 }} dashed />
                <div className={styles.details}>
                  <div className={styles.userdetail}>
                    <div className={styles.operation}>
                      <Icon type="dollar" theme="twoTone" />
                      <span>积分：</span>
                      <i className={styles.userscore} />
                      {userinfo.score}
                      <a href="#">转账</a>
                      <Divider type="vertical" className={styles.divider} />
                      <a href="/homepage/querypage">查询</a>
                    </div>
                    <p>
                      <Icon type="phone" theme="twoTone" />
                      <span>手机：</span>
                      <i className={styles.userphone} />
                      {userinfo.phone}
                      <a href="#">更换</a>
                    </p>
                    <p>
                      <Icon type="environment" theme="twoTone" />
                      <span>代理范围：</span>
                      <i className={styles.userproxy} />
                      {userinfo.proxy}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              // hoverable={config.hoverable}
              // bordered={config.bordered}
              style={cardstyle}
              loading={loading}
            >
              <div className={styles.bar}>
                <div className={styles.bartop}>
                  <div className={styles.barinfo}>
                    <Icon type="cloud" />
                    <span>网吧总量</span>
                  </div>
                </div>
                <Divider dashed />
                <div className={styles.details}>
                  <div className={styles.bardetail}>
                    <p>
                      <span style={{ fontSize: 66 }}>{barinfo.barnum}</span>
                      <span>家</span>
                    </p>
                    <p>
                      <a href="#">查看详情</a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card
              // hoverable={config.hoverable}
              // bordered={config.bordered}
              style={cardstyle}
              loading={loading}
            >
              <div className={styles.mechine}>
                <div className={styles.mechinetop}>
                  <div className={styles.mechineinfo}>
                    <Icon type="desktop" />
                    <span>开通机器数</span>
                  </div>
                </div>
                <Divider dashed />
                <div className={styles.details}>
                  <div className={styles.mechinedetail}>
                    <p>
                      <span style={{ fontSize: 66 }}>{barinfo.machine}</span>
                      <span>台</span>
                    </p>
                    <p>
                      <a href="#">查看详情</a>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default HomePage;
