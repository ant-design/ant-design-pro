---
order: 1
title: Classic
---

典型结果页面。

````jsx
import Result from 'ant-design-pro/lib/Result';
import { Button, Row, Col, Icon, Steps } from 'antd';

const { Step } = Steps;

const desc1 = (
  <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)' }}>
    <div style={{ margin: '8px 0 4px' }}>
      曲丽丽<Icon style={{ marginLeft: 8 }} type="dingding-o" />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12 }}>
    <div style={{ margin: '8px 0 4px' }}>
      周毛毛<Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="">催一下</a></div>
  </div>
);

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500', marginBottom: 20 }}>
      项目名称
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>项目 ID：</span>
        23421
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>负责人：</span>
        曲丽丽
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>生效时间：</span>
        2016-12-12 ~ 2017-12-12
      </Col>
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
    <Button type="primary">返回列表</Button>
    <Button>查看项目</Button>
    <Button>打 印</Button>
  </div>
);

ReactDOM.render(
  <Result
    type="success"
    title="提交成功"
    description="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示“单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
    extra={extra}
    actions={actions}
    style={{ width: '100%' }}
  />
, mountNode);
````
