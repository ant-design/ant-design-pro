import React, { PureComponent } from 'react';
import { Link } from 'dva/router';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import styles from './index.less';

export default class TopNavHeader extends PureComponent {
  render() {
    return (
      <div className={`${styles.head} ${this.props.theme === 'light' ? styles.light : ''}`}>
        <div className={`${styles.main} ${this.props.grid === 'Wide' ? styles.wide : ''}`}>
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={this.props.logo} alt="logo" />
                <h1>Ant Design Pro</h1>
              </Link>
            </div>
            <BaseMenu {...this.props} style={{ paddingTop: '9px', border: 'none' }} />
          </div>
          <div className={styles.right}>
            <RightContent {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
