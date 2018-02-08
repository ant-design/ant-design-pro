import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import styles from './UserCenter.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class UserCenter extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const { list: { list }, loading } = this.props;

    return (
      <div className={styles.userCenter}>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <Card bordered={false}>
              <div className={styles.avatarHolder}>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                <div className={styles.name}>username</div>
                <div className={styles.signature}>海纳百川，有容乃大</div>
              </div>
            </Card>
          </Col>
          <Col lg={16} md={24}>
            <Card bordered={false}>test</Card>
          </Col>
        </Row>
      </div>
    );
  }
}
