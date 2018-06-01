import React, { PureComponent } from 'react';
import { Select, message, List, Switch, Divider } from 'antd';
import DrawerMenu from 'rc-drawer-menu';
import { connect } from 'dva';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import BlockChecbox from './BlockChecbox';

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);

@connect(({ setting }) => ({ setting }))
class SettingDarwer extends PureComponent {
  componentDidMount() {
    const { themeColor } = this.props.setting;
    if (themeColor !== '#1890FF') {
      this.colorChange(themeColor);
    }
  }
  getLayOutSetting = () => {
    const { grid, fixedHeader, autoHideHeader, fixSiderbar } = this.props.setting;
    return [
      {
        title: '栅格模式',
        action: [
          <Select
            value={grid}
            size="small"
            onSelect={value => this.changeSetting('grid', value)}
            style={{ width: 80 }}
          >
            <Select.Option value="Wide">Wide</Select.Option>
            <Select.Option value="Fluid">Fluid</Select.Option>
          </Select>,
        ],
      },
      {
        title: 'Fixed Header',
        action: [
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />,
        ],
      },
      {
        title: '下滑时隐藏 Header',
        action: [
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />,
        ],
      },
      {
        title: 'Fix Siderbar',
        action: [
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />,
        ],
      },
    ];
  };
  changeSetting = (key, value) => {
    const nextState = { ...this.props.setting };
    nextState[key] = value;
    if (key === 'layout') {
      if (value === 'topmenu') {
        nextState.grid = 'Wide';
      } else {
        nextState.grid = 'Fluid';
      }
    }
    this.setState(nextState, () => {
      this.props.dispatch({
        type: 'setting/changeSetting',
        payload: this.state,
      });
    });
  };
  togglerContent = () => {
    this.changeSetting('collapse', !this.props.setting.collapse);
  };
  colorChange = color => {
    this.changeSetting('themeColor', color);
    const hideMessage = message.loading('正在编译主题！', 0);
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': color,
        })
        .then(() => {
          hideMessage();
        })
        .catch(() => {
          message.error(`Failed to update theme`);
        });
    }, 200);
  };
  render() {
    const { collapse, silderTheme, themeColor, layout } = this.props.setting;
    return (
      <div className={styles.settingDarwer}>
        <div className={styles.mini_bar} onClick={this.togglerContent}>
          <img
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/ApQgLmeZDNJMomKNvavq.svg"
          />
        </div>
        <DrawerMenu
          parent={null}
          level={null}
          handleChild={null}
          open={collapse}
          placement="right"
          width="336px"
          style={{
            zIndex: 999,
          }}
          onMaskClick={this.togglerContent}
        >
          <div className={styles.content}>
            <Body title="整体风格设置">
              <BlockChecbox
                list={[
                  {
                    key: 'dark',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  },
                  {
                    key: 'light',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  },
                ]}
                value={silderTheme}
                onChange={value => this.changeSetting('silderTheme', value)}
              />
            </Body>

            <ThemeColor value={themeColor} onChange={this.colorChange} />

            <Divider />

            <Body title="导航设置 ">
              <BlockChecbox
                list={[
                  {
                    key: 'sidemenu',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  },
                  {
                    key: 'topmenu',
                    url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                  },
                ]}
                value={layout}
                onChange={value => this.changeSetting('layout', value)}
              />
            </Body>

            <List
              split={false}
              dataSource={this.getLayOutSetting()}
              renderItem={item => <List.Item actions={item.action}>{item.title}</List.Item>}
            />
          </div>
        </DrawerMenu>
      </div>
    );
  }
}

export default SettingDarwer;
