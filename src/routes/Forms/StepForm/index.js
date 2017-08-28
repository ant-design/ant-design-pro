import React, { cloneElement, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Steps, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Step1 from './Step1';
import styles from '../style.less';

const Step = Steps.Step;

@Form.create()
class StepForm extends PureComponent {
  getCurrentStep() {
    const { routes } = this.props;
    switch (routes[routes.length - 1].path) {
      case 'step-form': return 0;
      case 'confirm': return 1;
      case 'result': return 2;
      default: return 0;
    }
  }
  render() {
    const { form, stepFormData, submitting, dispatch, children } = this.props;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    return (
      <PageHeaderLayout title="分步表单" content="将表单内容进行分步可以提高用户处理的专注度，降低页面复杂性。">
        <Card bordered={false}>
          <div>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {children ? cloneElement(children, {
              form,
              formItemLayout,
              data: stepFormData,
              submitting,
              dispatch,
            }) : (
              <Step1
                formItemLayout={formItemLayout}
                form={form}
                dispatch={dispatch}
              />
            )}
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
