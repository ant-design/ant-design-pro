import React from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';
import ConnectState from '@/models/connect';
import { ContentWidth } from 'config/defaultSettings';

interface GridContentProps {
  contentWidth: ContentWidth;
  children: React.ReactNode;
}

const GridContent = (props: GridContentProps) => {
  const { contentWidth, children } = props;
  let className = `${styles.main}`;
  if (contentWidth === 'Fixed') {
    className = `${styles.main} ${styles.wide}`;
  }
  return <div className={className}>{children}</div>;
};

export default connect(({ setting }: ConnectState) => ({
  contentWidth: setting.contentWidth,
}))(GridContent);
