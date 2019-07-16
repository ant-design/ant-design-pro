import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <p style={{ textAlign: 'center' }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageHeaderWrapper>
);
