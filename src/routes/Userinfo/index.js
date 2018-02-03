import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Route, routerRedux } from 'dva/router';
import styles from './index.less';
import Userinfo from './Userinfo';
import SafeView from './SafeView';
import AccountView from './AccountView';
import MessageView from './MessageView';

const meunArray = [
  { title: '基本设置', key: 'info' },
  { title: '安全设置', key: 'safe' },
  { title: '账号绑定', key: 'account' },
  { title: '新消息通知', key: 'message' },
];

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
export default class BaseInfo extends PureComponent {
  state = {
    selectKey: this.props.match.params.page || 'info',
  };
  getMeun = () => {
    return meunArray.map((item) => {
      const { selectKey } = this.state;
      return (
        <div
          key={item.key}
          onClick={() => this.selectKey(item)}
          className={
            item.key === selectKey
              ? `${styles.meunItem} ${styles.select}`
              : styles.meunItem
          }
        >
          {item.title}
        </div>
      );
    });
  };
  getRightTitle = () => {
    const meunItem = meunArray.find(item => item.key === this.state.selectKey);
    return meunItem.title;
  };
  selectKey = ({ key }) => {
    this.props.dispatch(routerRedux.push(`/userinfo/base/${key}`));
    this.setState({
      selectKey: key,
    });
  };
  render() {
    const { currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    return (
      <div className={styles.main}>
        <div className={styles.leftMeun}>{this.getMeun()}</div>
        <div className={styles.right}>
          <div className={styles.title}>{this.getRightTitle()}</div>
          <Route
            path="/userinfo/base/info"
            render={props => <Userinfo {...props} currentUser={currentUser} />}
          />
          <Route path="/userinfo/base/safe" component={SafeView} />
          <Route path="/userinfo/base/account" component={AccountView} />
          <Route path="/userinfo/base/message" component={MessageView} />
        </div>
      </div>
    );
  }
}
