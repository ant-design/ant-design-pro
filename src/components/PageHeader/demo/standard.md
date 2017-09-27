---
order: 1
title: Standard
---

标准页头。

````jsx
import PageHeader from 'ant-design-pro/lib/PageHeader';
import { Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <div>
    <Button size="large" type="primary">主操作</Button>
    <Button size="large">次操作</Button>
    <Dropdown overlay={menu}>
      <Button size="large">
        更多 <Icon type="down" />
      </Button>
    </Dropdown>
  </div>
);

const extra = (
  <Row>
    <Col sm={24} md={12}>
      <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>状态</div>
      <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>待审批</div>
    </Col>
    <Col sm={24} md={12}>
      <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>订单金额</div>
      <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>¥ 568.08</div>
    </Col>
  </Row>
);

const breadcrumbList = [{
  title: '一级菜单',
  href: '/',
}, {
  title: '二级菜单',
  href: '/',
}, {
  title: '三级菜单',
}];

const tabList = [{
  key: 'detail',
  tab: '详情',
}, {
  key: 'rule',
  tab: '规则',
}];

function onTabChange(key) {
  console.log(key);
}

ReactDOM.render(
  <div>
    <PageHeader
      title="单号：234231029431"
      logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/JcBAEvlHGhVvBekIJCWT.svg" />}
      action={action}
      content="DescriptionList 占位"
      extraContent={extra}
      breadcrumbList={breadcrumbList}
      tabList={tabList}
      onTabChange={onTabChange}
    />
  </div>
, mountNode);
````
