import { connect } from 'dva';
import React from 'react';
import styles from './GridContent.less';

interface GridContentProps {
  contentWidth: string;
  children: React.ReactNode;
}
const GridContent: React.FunctionComponent<GridContentProps> = props => {
  const { contentWidth, children } = props;
  let className = `${styles.main}`;
  if (contentWidth === 'Fixed') {
    className = `${styles.main} ${styles.wide}`;
  }
  return <div className={className}>{children}</div>;
};

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(GridContent);
