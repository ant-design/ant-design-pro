---
order: 1
title: Standard
---

标准页头。

````jsx
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import { Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

const { Description } = DescriptionList;

const description = (
  <DescriptionList col="2">
    <Description term="创建人">曲丽丽</Description>
    <Description term="订购产品">XX 服务</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="关联单据"><a href="">12421</a></Description>
  </DescriptionList>
);

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <div>
    <Button>操作</Button>
    <Button>操作</Button>
    <Dropdown overlay={menu}>
      <Button>
        更多 <Icon type="down" />
      </Button>
    </Dropdown>
    <Button type="primary">主操作</Button>
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
      content={description}
      extraContent={extra}
      breadcrumbList={breadcrumbList}
      tabList={tabList}
      onTabChange={onTabChange}
    />
  </div>
, mountNode);
````
