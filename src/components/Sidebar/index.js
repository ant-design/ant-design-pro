import React, { PureComponent, Fragment } from 'react';
import { Select, message, List, Switch, Divider, Radio } from 'antd';
import DrawerMenu from 'rc-drawer-menu';
import { connect } from 'dva';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import LayoutSeting from './LayoutSetting';

const RadioGroup = Radio.Group;

const ColorBlock = ({ color, title }) => (
  <Fragment>
    <div
      className={styles.color_block}
      style={{
        backgroundColor: color,
      }}
    />
    <div className={styles.color_block_title}>{title}</div>
  </Fragment>
);

const Body = ({ children, title, style }) => (
  <div
    style={{
      padding: 15,
      ...style,
    }}
  >
    <h3 className={styles.bodyTitle}>{title}</h3>
    {children}
  </div>
);
@connect(({ setting }) => ({ setting }))
class Sidebar extends PureComponent {
  componentDidMount() {
    const { themeColor } = this.props.setting;
    if (themeColor !== '#1890FF') {
      this.colorChange(themeColor);
    }
  }
  getLayOutSetting = () => {
    const { grid, fixedHeader, autoHideHeader, fixSiderbar, layout } = this.props.setting;
    return [
      {
        title: '栅格模式',
        isShow: true,
        action: [
          <Select
            value={grid}
            onSelect={value => this.changeSetting('grid', value)}
            style={{ width: 120 }}
          >
            <Select.Option value="Wide">Wide</Select.Option>
            <Select.Option value="Fluid">Fluid</Select.Option>
          </Select>,
        ],
      },
      {
        title: 'Fixed Header',
        isShow: true,
        action: [
          <Switch
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />,
        ],
      },
      {
        title: '↳ 下滑时隐藏 Header',
        isShow: true,
        action: [
          <Switch
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />,
        ],
      },
      {
        title: 'Fix Siderbar',
        isShow: layout === 'sidemenu',
        action: [<Switch checked={!!fixSiderbar} onChange={this.fixSiderbar} />],
      },
    ].filter(item => item.isShow);
  };
  fixSiderbar = checked => {
    this.changeSetting('fixSiderbar', checked);
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
  };
  render() {
    const radioStyle = {
      display: 'block',
    };
    const { collapse, silderTheme, themeColor, layout, colorWeak } = this.props.setting;
    return (
      <div className={styles.sidebar}>
        <div className={styles.mini_bar} onClick={this.togglerContent}>
          <img
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/ApQgLmeZDNJMomKNvavq.svg"
          />
        </div>
        <DrawerMenu
          parent={null}
          level={null}
          iconChild={null}
          open={collapse}
          placement="right"
          width="336px"
          onMaskClick={this.togglerContent}
        >
          <div className={styles.content}>
            <Body
              title="整体风格设置"
              style={{
                paddingBottom: 10,
              }}
            >
              <RadioGroup
                onChange={({ target }) => this.changeSetting('silderTheme', target.value)}
                value={silderTheme}
              >
                <Radio style={radioStyle} value="dark">
                  <ColorBlock color="#002140" title="深色导航" />
                </Radio>
                <Radio style={radioStyle} value="light">
                  <ColorBlock color="#E9E9E9" title="浅色导航" />
                </Radio>
              </RadioGroup>
              <ThemeColor value={themeColor} onChange={this.colorChange} />
            </Body>
            <Divider style={{ margin: 0 }} />
            <Body title="导航设置 ">
              <LayoutSeting
                value={layout}
                onChange={value => this.changeSetting('layout', value)}
              />
              <List
                split={false}
                dataSource={this.getLayOutSetting()}
                renderItem={item => <List.Item actions={item.action}>{item.title}</List.Item>}
              />
            </Body>
            <Divider style={{ margin: 0 }} />
            <Body title="其他设置">
              <List
                split={false}
                dataSource={[
                  {
                    title: '色弱模式',
                    action: [
                      <Select
                        value={colorWeak}
                        onSelect={value => this.changeSetting('colorWeak', value)}
                        style={{ width: 120 }}
                      >
                        <Select.Option value="open">打开</Select.Option>
                        <Select.Option value="colse">关闭</Select.Option>
                      </Select>,
                    ],
                  },
                ]}
                renderItem={item => <List.Item actions={item.action}>{item.title}</List.Item>}
              />
            </Body>
          </div>
        </DrawerMenu>
      </div>
    );
  }
}

export default Sidebar;
