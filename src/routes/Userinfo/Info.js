import React, { Component } from 'react';
import { connect } from 'dva';
import { Route, routerRedux, Switch, Redirect } from 'dva/router';
import { Menu } from 'antd';
import styles from './Info.less';
import { getRoutes } from '../../utils/utils';

const { Item } = Menu;

const menuMap = {
  base: '基本设置',
  safe: '安全设置',
  account: '账号绑定',
  message: '新消息通知',
};

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
export default class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    let key = location.pathname.replace(`${match.path}/`, '');
    key = menuMap[key] ? key : 'base';
    this.state = {
      selectKey: key,
    };
  }
  getmenu = () => {
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };
  getRightTitle = () => {
    return menuMap[this.state.selectKey];
  };
  selectKey = ({ key }) => {
    this.props.dispatch(routerRedux.push(`/userinfo/${key}`));
    this.setState({
      selectKey: key,
    });
  };
  render() {
    const { match, routerData, currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    return (
      <div className={styles.main}>
        <div className={styles.leftmenu}>
          <Menu
            mode="inline"
            selectedKeys={[this.state.selectKey]}
            onClick={this.selectKey}
          >
            {this.getmenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{this.getRightTitle()}</div>
          <Switch>
            {getRoutes(match.path, routerData).map(item => (
              <Route
                key={item.key}
                path={item.path}
                render={props => (
                  <item.component {...props} currentUser={currentUser} />
                )}
                exact={item.exact}
              />
            ))}
            <Redirect exact from="/userinfo" to="/userinfo/base" />
            <Redirect to="/exception/404" />
          </Switch>
        </div>
      </div>
    );
  }
}
