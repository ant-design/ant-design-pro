import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import RightContent from '../GlobalHeader/RightContent';
import BaseMeun from '../SiderMenu/BaseMeun';
import styles from './index.less';

export default class TopNavHeader extends PureComponent {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.logo} key="logo">
            <Link to="/">
              <img src={this.props.logo} alt="logo" />
              <h1>Ant Design Pro</h1>
            </Link>
          </div>
          <BaseMeun {...this.props} style={{ padding: '9px 0' }} />
        </div>
        <div className={styles.right}>
          <RightContent theme="white" {...this.props} />
        </div>
      </div>
    );
  }
}
