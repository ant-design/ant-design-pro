import React from 'react';

const Welcome = () => (
  <p style={{ textAlign: 'center' }}>
    想要添加更多页面？请参考{' '}
    <a href="https://umijs.org/guide/block.html" target="_blank" rel="noopener noreferrer">
      umi 区块
    </a>
    。
  </p>
);
Welcome.title = '欢迎使用';
export default Welcome;
