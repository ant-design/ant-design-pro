import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Steps, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from '../style.less';

const { Step } = Steps;

@Form.create()
class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'step-form': return 0;
      case 'confirm': return 1;
      case 'result': return 2;
      default: return 0;
    }
  }
  getCurrentComponent() {
    const componentMap = {
      0: Step1,
      1: Step2,
      2: Step3,
    };
    return componentMap[this.getCurrentStep()];
  }
  render() {
    const { form, stepFormData, submitting, dispatch } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    const CurrentComponent = this.getCurrentComponent();
    return (
      <PageHeaderLayout title="分步表单" content="将表单内容进行分步可以提高用户处理的专注度，降低页面复杂性。">
        <Card bordered={false}>
          <div>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            <CurrentComponent
              formItemLayout={formItemLayout}
              form={form}
              dispatch={dispatch}
              data={stepFormData}
              submitting={submitting}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default connect(state => ({
  stepFormData: state.form.step,
  submitting: state.form.stepFormSubmitting,
}))(StepForm);
