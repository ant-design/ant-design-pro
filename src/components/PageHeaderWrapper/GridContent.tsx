import { connect } from 'dva';
import React from 'react';
import styles from './GridContent.less';
import { SettingModelState } from '@/models/setting';

interface GridContentProps {
  contentWidth: string;
  children: React.ReactNode;
}
const GridContent: React.FC<GridContentProps> = props => {
  const { contentWidth, children } = props;
  let className = `${styles.main}`;
  if (contentWidth === 'Fixed') {
    className = `${styles.main} ${styles.wide}`;
  }
  return <div className={className}>{children}</div>;
};

export default connect(({ setting }: { setting: SettingModelState }) => ({
  contentWidth: setting.contentWidth,
}))(GridContent);
