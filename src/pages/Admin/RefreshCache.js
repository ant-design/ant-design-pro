import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Alert, Button, Card} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';


@connect(({ adminModel, loading }) => ({
  adminModel,
  submitting: loading.effects['adminModel/refreshCache'],
}))
class RefreshCache extends PureComponent{

  handelRefreshCacth = () => {
    const {dispatch} = this.props;
    dispatch({
      type:'adminModel/refreshCache'
    })
  }

  renderMessage = (status,message)=>{
    return <Alert
      closable
      showIcon
      type={status}
      banner
      message={message}
      style={{ marginBottom: 24, marginTop: 24 ,width:'400px'}}
    />
  }

  render(){
    const { adminModel, submitting } = this.props;
    return(
      <PageHeaderWrapper>
        <Card title='Refresh Cache for Agent Service'>
          <div>
            <Button style={{ marginLeft: 8 }} onClick={this.handelRefreshCacth} htmlType="button">Refresh Cache</Button>
            {adminModel.status !== undefined &&
            !submitting &&
            this.renderMessage(
              adminModel.status,adminModel.message
            )}
          </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default RefreshCache
