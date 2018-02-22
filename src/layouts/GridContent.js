import React, { PureComponent } from 'react';
import { connect } from 'dva';
import styles from './GridContent.less';

class GridContent extends PureComponent {
  render() {
    let className = `${styles.main}`;
    if (this.props.layout === 'fluid') {
      className = `${styles.main} ${styles.fluid}`;
    }
    return <div className={className}>{this.props.children}</div>;
  }
}

export default connect(({ global }) => ({
  layout: global.layout,
}))(GridContent);
