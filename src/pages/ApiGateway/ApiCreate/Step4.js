import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Button, Col, Row} from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import {getItemValue} from '@/utils/masterData';
import styles from './style.less';

@connect(({ apiCreateModel }) => ({
  apiService: apiCreateModel.apiService,
}))
class Step4 extends React.PureComponent {
  render() {
    const { apiService } = this.props;
    const apiServiceBackend = apiService.apiServiceBackends?apiService.apiServiceBackends[0]:[{}];
    const onFinish = () => {
      router.push('/apiGateway/apiCreate/info');
    };

    const advance = () => {
      const {apiId} = apiService;
      // router.push(`/apiGateway/apiCreate/${apiId}`);
      router.push({
        pathname: `/apiGateway/apiUpdate`, // 通过url参数传递
        state: { // 通过对象传递
          apiId,
          apiService, // 表格某行的对象数据
        },
      });
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            api name：
          </Col>
          <Col xs={24} sm={16}>
            {apiService.name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            api path：
          </Col>
          <Col xs={24} sm={16}>
            {apiService.requestUrl}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            落地方地址：
          </Col>
          <Col xs={24} sm={16}>
            {apiServiceBackend.url}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            落地方服务类型：
          </Col>
          <Col xs={24} sm={16}>
            {getItemValue('apiService','service_type',apiServiceBackend.serviceType)}
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={onFinish} htmlType="button">
          再创建一笔
        </Button>
        <Button onClick={advance} htmlType="button">
          高级配置
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
