import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './Join.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button size="large" type="primary">
        返回首页
      </Button>
    </Link>
  </div>
);

const Join = () => (
  <Result
    className={styles.joinResult}
    type="success"
    title={<div className={styles.title}>成功申请加入团队，等待管理员处理。</div>}
    actions={actions}
    style={{ marginTop: 56 }}
  />
);

export default Join;
