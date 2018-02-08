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
            <Card bordered={false}>test</Card>
          </Col>
          <Col lg={16} md={24}>
            <Card bordered={false}>test</Card>
          </Col>
        </Row>
      </div>
    );
  }
}
