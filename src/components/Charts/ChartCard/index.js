import React from 'react';
import { Card, Spin } from 'antd';

import styles from './index.less';

const ChartCard = ({ loading, contentHeight, title, action, total, footer, children, ...rest }) => {
  const content = (
    <div className={styles.chartCard}>
      <div className={styles.meta}>
        <span className={styles.title}>{title}</span>
        <span className={styles.action}>{action}</span>
      </div>
      {
        // eslint-disable-next-line
        total && <p className={styles.total} dangerouslySetInnerHTML={{ __html: total }} />
      }
      <div className={styles.content} style={{ height: contentHeight || 'auto' }}>
        <div className={contentHeight && styles.contentFixed}>
          {children}
        </div>
      </div>
      {
        footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )
      }
    </div>
  );

  return (
    <Card
      bodyStyle={{ padding: '20px 24px 8px 24px' }}
      {...rest}
    >
      {
        loading ? (
          <Spin size="large">{content}</Spin>
        ) : content
      }
    </Card>
  );
};

export default ChartCard;
