import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ apiCreateModel }) => ({
  data: apiCreateModel.step,
}))
class Step4 extends React.PureComponent {
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/apiGateway/apiCreate/info');
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            api名称：
          </Col>
          <Col xs={24} sm={16}>
            {data.apiName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            请求Path：
          </Col>
          <Col xs={24} sm={16}>
            {data.consumerPath}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            后端地址：
          </Col>
          <Col xs={24} sm={16}>
            {data.producerUrl}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            后端Path：
          </Col>
          <Col xs={24} sm={16}>
            {data.producerPath}
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish} htmlType="button">
          再创建一笔
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="操作成功，请到Api列表确认该Api是否需要发布！"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step4;
