import React from 'react';
import { Button, Icon, Card } from 'antd';
import Result from '../../components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: '600', marginBottom: 16 }}>
      您提交的内容有如下错误：
    </div>
    <div style={{ marginBottom: 8 }}>
      <Icon style={{ color: '#f04134', marginRight: 8 }} type="close-circle-o" />您的账户已被冻结
      <a style={{ marginLeft: 24 }}>立即解冻 <Icon type="right" /></a>
    </div>
    <div>
      <Icon style={{ color: '#f04134', marginRight: 8 }} type="close-circle-o" />您的账户还不具备申请资格
      <a style={{ marginLeft: 24 }}>立即升级 <Icon type="right" /></a>
    </div>
  </div>
);

const actions = <Button size="large" type="primary">返回修改</Button>;

export default () => (
  <PageHeaderLayout>
    <Card bordered={false} noHovering>
      <Result
        type="error"
        title="提交失败"
        description="请核对并修改以下信息后，再重新提交。"
        extra={extra}
        actions={actions}
        style={{ margin: '30px 120px' }}
      />
    </Card>
  </PageHeaderLayout>
);
