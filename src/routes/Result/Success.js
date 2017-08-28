import React from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from '../../components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Step = Steps.Step;

const desc1 = (
  <div style={{ fontSize: 14 }}>
    <div style={{ margin: '4px 0' }}>
      曲丽丽<Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 14 }}>
    <div style={{ margin: '4px 0' }}>
      周毛毛<Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="">催一下</a></div>
  </div>
);

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.65)', fontWeight: '600', marginBottom: 16 }}>
      项目名称
    </div>
    <Row style={{ color: 'rgba(0, 0, 0, 0.65)', marginBottom: 20 }}>
      <Col span={6}>项目 ID：23421</Col>
      <Col span={6}>负责人：曲丽丽</Col>
      <Col span={12}>生效时间：2016-12-12 ~ 2017-12-12</Col>
    </Row>
    <Steps progressDot current={1}>
      <Step title="创建项目" description={desc1} />
      <Step title="部门初审" description={desc2} />
      <Step title="财务复核" />
      <Step title="完成" />
    </Steps>
  </div>
);

const actions = (
  <div>
    <Button size="large" type="primary">返回列表</Button>
    <Button size="large">查看项目</Button>
    <Button size="large">打 印</Button>
  </div>
);

export default () => (
  <PageHeaderLayout>
    <Card bordered={false} noHovering>
      <Result
        type="success"
        title="提交成功"
        description="提交结果页用于反馈一系列操作任务的处理结果，
        如果仅是简单操作，使用 Message 全局提示反馈即可。
        本文字区域可以展示简单的补充说明，如果有类似展示
        “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
        extra={extra}
        actions={actions}
        style={{ margin: '30px 120px' }}
      />
    </Card>
  </PageHeaderLayout>
);
