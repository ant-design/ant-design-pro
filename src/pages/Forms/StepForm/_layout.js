import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../style.less';

// import { Route, Redirect, Switch } from 'dva/router';
// import { getRoutes } from '../../../utils/utils';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'Step1':
        return 0;
      case 'Step2':
        return 1;
      case 'Step3':
        return 2;
      default:
        return 0;
    }
  }

  render() {
    const { location, children } = this.props;
    return (
      <PageHeaderLayout
        title="分步表单"
        tabActiveKey={location.pathname}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {children}
            {/* <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/form/step-form" to="/form/step-form/info" />
              <Redirect to="/exception/404" />
            </Switch> */}
          </Fragment>
        </Card>
      </PageHeaderLayout>
    );
  }
}
