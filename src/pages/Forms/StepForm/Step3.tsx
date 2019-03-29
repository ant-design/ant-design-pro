import Result from '@/components/Result';
import { Button, Col, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import React, { Fragment } from 'react';
import router from 'umi/router';
import styles from './style.less';
import { FormModelState } from '../models/form';

interface ResultFormProps extends FormComponentProps {
  data: {
    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}
const ResultPage: React.FC<ResultFormProps> = props => {
  const { data } = props;
  const onFinish = () => {
    router.push('/form/step-form/info');
  };
  const information = (
    <div className={styles.information}>
      <Row>
        <Col xs={24} sm={8} className={styles.label}>
          付款账户：
        </Col>
        <Col xs={24} sm={16}>
          {data.payAccount}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} className={styles.label}>
          收款账户：
        </Col>
        <Col xs={24} sm={16}>
          {data.receiverAccount}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} className={styles.label}>
          收款人姓名：
        </Col>
        <Col xs={24} sm={16}>
          {data.receiverName}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} className={styles.label}>
          转账金额：
        </Col>
        <Col xs={24} sm={16}>
          <span className={styles.money}>{data.amount}</span> 元
        </Col>
      </Row>
    </div>
  );
  const actions = (
    <Fragment>
      <Button type="primary" onClick={onFinish}>
        再转一笔
      </Button>
      <Button>查看账单</Button>
    </Fragment>
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

export default connect(({ form }: { form: FormModelState }) => ({
  data: form.step,
}))(ResultPage);
