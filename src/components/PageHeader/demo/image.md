---
order: 2
title: With Image
---

带图片的页头。

````jsx
import PageHeader from 'ant-design-pro/lib/PageHeader';

const content = (
  <div>
    <p>段落示意：蚂蚁金服务设计平台-ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
提供跨越设计与开发的体验解决方案。</p>
    <div className="link">
      <a>
        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" /> 快速开始
      </a>
      <a>
        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" /> 产品简介
      </a>
      <a>
        <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" /> 产品文档
      </a>
    </div>
  </div>
);

const extra = (
  <div className="imgContainer">
    <img style={{ width: '100%' }} alt="" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png" />
  </div>
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

ReactDOM.render(
  <div>
    <PageHeader
      title="这是一个标题"
      content={content}
      extraContent={extra}
      breadcrumbList={breadcrumbList}
    />
  </div>
, mountNode);
````

<style>
#scaffold-src-components-PageHeader-demo-image .imgContainer {
  margin-top: -60px;
  text-align: center;
  width: 195px;
}
#scaffold-src-components-PageHeader-demo-image .link {
	margin-top: 16px;
}
#scaffold-src-components-PageHeader-demo-image .link a {
  margin-right: 32px;
}
#scaffold-src-components-PageHeader-demo-image .link img {
  vertical-align: middle;
  margin-right: 8px;
}
</style>
