import React from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';

const GridContent = props => {
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
