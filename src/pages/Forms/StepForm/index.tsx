import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Steps } from 'antd';
import React, { Fragment } from 'react';
import styles from '../style.less';

const { Step } = Steps;

interface IStepFormProps {
  location: Location;
}

const StepForm: React.FC<IStepFormProps> = props => {
  const { location, children } = props;
  const getCurrentStep = () => {
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info':
        return 0;
      case 'confirm':
        return 1;
      case 'result':
        return 2;
      default:
        return 0;
    }
  };
  return (
    <PageHeaderWrapper
      title="分步表单"
      tabActiveKey={location.pathname}
      content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    >
      <Card bordered={false}>
        <Fragment>
          <Steps current={getCurrentStep()} className={styles.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
          </Steps>
          {children}
        </Fragment>
      </Card>
    </PageHeaderWrapper>
  );
};
export default StepForm;
