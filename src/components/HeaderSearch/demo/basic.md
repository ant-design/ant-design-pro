---
order: 0
title: 全局搜索
---

通常放置在导航工具条右侧。（点击搜索图标预览效果）

````jsx
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import { Icon } from 'antd';

ReactDOM.render(
  <div
    style={{
      textAlign: 'right',
      height: '64px',
      lineHeight: '64px',
      boxShadow: '0 1px 4px rgba(0,21,41,.12)',
      padding: '0 32px',
      width: '400px',
    }}
  >
    <HeaderSearch
      placeholder="站内搜索"
      dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
      onSearch={(value) => {
        console.log('input', value); // eslint-disable-line
      }}
      onPressEnter={(value) => {
        console.log('enter', value); // eslint-disable-line
      }}
    />
  </div>
, mountNode);
````
