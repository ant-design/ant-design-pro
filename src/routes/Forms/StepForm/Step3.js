import React from 'react';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

export default ({ dispatch, data }) => {
  const onFinish = () => {
    dispatch(routerRedux.push('/form/step-form'));
  };
  const information = (
    <div className={styles.information}>
      <Row>
        <Col span={8} className={styles.label}>付款账户：</Col>
        <Col span={16}>{data.payAccount}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>收款账户：</Col>
        <Col span={16}>{data.receiverAccount}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>收款人姓名：</Col>
        <Col span={16}>{data.receiverName}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>转账金额：</Col>
        <Col span={16}><span className={styles.money}>{data.amount}</span> 元</Col>
      </Row>
    </div>
  );
  const actions = (
    <div>
      <Button type="primary" onClick={onFinish}>
        再转一笔
      </Button>
      <Button>
        查看账单
      </Button>
    </div>
  );
  return (
    <Result
      type="success"
      title="操作成功"
      description="预计两小时内到账"
      extra={information}
      actions={actions}
      className={styles.result}
    />
  );
};
