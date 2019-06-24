import React from 'react';
import { Button } from 'antd';
import router from 'umi/router';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
  <div
    style={{
      height: '100vh',
      padding: 80,
      textAlign: 'center',
    }}
  >
    <img src="https://gw.alipayobjects.com/zos/antfincdn/wsE2Pw%243%26L/noFound.svg" alt="404" />
    <br />
    <br />
    <h1>404</h1>
    <p>Sorry, the page you visited does not exist.</p>
    <Button type="primary" onClick={() => router.push('/')}>
      Back Home
    </Button>
  </div>
);

export default NoFoundPage;
