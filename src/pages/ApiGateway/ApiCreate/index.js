import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import styles from '../style.less';

const { Step } = Steps;

class StepForm extends PureComponent {

  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'consumer':
        return 1;
      case 'producer':
        return 2;
      case 'result':
        return 3;
      case 'advance':
        return 3;
      default:
        return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    console.log(location.pathname,children);

    return (
      <Card bordered={false}>
        <Fragment>
          <Steps current={this.getCurrentStep()} className={styles.steps}>
            <Step title="基本信息" />
            <Step title="定义请求信息" />
            <Step title="定义Api后端服务" />
            <Step title="高级配置／完成" />
          </Steps>
          {children}
        </Fragment>
      </Card>
    );
  }
}

export default StepForm;
