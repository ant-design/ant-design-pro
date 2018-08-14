import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { FormattedMessage } from 'umi/locale';
import { Menu } from 'antd';
import styles from './Info.less';
import GridContent from '@/layouts/GridContent';

const { Item } = Menu;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
export default class Info extends Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    this.state = {
      mode: 'inline',
      menuMap: {
        base: <FormattedMessage id="app.settings.menuMap.basic" defaultMessage="Basic Settings" />,
        security: (
          <FormattedMessage id="app.settings.menuMap.security" defaultMessage="Security Settings" />
        ),
        binding: (
          <FormattedMessage id="app.settings.menuMap.binding" defaultMessage="Account Binding" />
        ),
        notification: (
          <FormattedMessage
            id="app.settings.menuMap.notification"
            defaultMessage="New Message Notification"
          />
        ),
      },
    };
    let key = location.pathname.replace(`${match.path}/`, '');
    const { menuMap } = this.state;
    key = menuMap[key] ? key : 'base';
    this.setState({
      selectKey: key,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  static getDerivedStateFromProps(props, state) {
    const { match, location } = props;
    let selectKey = location.pathname.replace(`${match.path}/`, '');
    selectKey = state.menuMap[selectKey] ? selectKey : 'base';
    if (selectKey !== state.selectKey) {
      return { selectKey };
    }
    return null;
  }

  getmenu = () => {
    const { menuMap } = this.state;
    return Object.keys(menuMap).map(item => <Item key={item}>{menuMap[item]}</Item>);
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    return menuMap[selectKey];
  };

  selectKey = ({ key }) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push(`/account/settings/${key}`));
    this.setState({
      selectKey: key,
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      let mode = 'inline';
      const { offsetWidth } = this.main;
      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode,
      });
    });
  };

  render() {
    const { children, currentUser } = this.props;
    if (!currentUser.userid) {
      return '';
    }
    const { mode, selectKey } = this.state;
    return (
      <GridContent>
        <div
          className={styles.main}
          ref={ref => {
            this.main = ref;
          }}
        >
          <div className={styles.leftmenu}>
            <Menu mode={mode} selectedKeys={[selectKey]} onClick={this.selectKey}>
              {this.getmenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}
