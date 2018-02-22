import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';

class GridContent extends PureComponent {
  render() {
    let className = `${styles.main}`;
    if (this.props.grid === 'Wide') {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div className={className}>{this.props.children}</div>;
  }
}

export default connect(({ setting }) => ({
  grid: setting.grid,
}))(GridContent);
