import React, {Fragment} from 'react';
import {Button} from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

class Step4 extends React.PureComponent {
  render() {
    const {location} = this.props;
    const {state} = location;
    const {wsdlId} = state || {wsdlId:''};
    const apiList = () => {
      router.push({
        pathname: `/apiGateway/apiList`,
        state :{
          wsdlId
        }
      });
    };
    const wsdlList = () => {
      router.push('/apiGateway/wsdlList');
    };
    const actions = (
      <Fragment>
        <Button type="primary" onClick={apiList} htmlType="button">
          返回Api列表
        </Button>
        <Button onClick={wsdlList} htmlType="button">
          返回Wsdl列表
        </Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="操作成功，请到Api列表确认该Api是否需要发布！"
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step4;
