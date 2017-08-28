import React from 'react';
import { Button, Input } from 'antd';

import styles from './index.less';

export default ({ onSearch = () => ({}), text = '搜索', ...reset }) => (
  <div className={styles.search}>
    <Input
      placeholder="请输入"
      size="large"
      {...reset}
      addonAfter={<Button onClick={onSearch} type="primary">{text}</Button>}
    />
  </div>
);
