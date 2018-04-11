import React, { PureComponent, Fragment } from 'react';
import { Select, List, Switch, Divider, Radio } from 'antd';
import DrawerMenu from 'rc-drawer-menu';
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

class Sidebar extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {};
    Object.keys(nextProps).forEach(key => {
      if (nextProps[key] && prevState[key] !== undefined) {
        nextState[key] = nextProps[key];
      }
    });
    return nextState;
  }
  constructor(props) {
    super(props);
    this.defaultstate = {
      collapse: false,
      silderTheme: 'dark',
      themeColor: '#1890FF',
      layout: 'sidemenu',
      grid: 'Fluid',
      fixedHeader: false,
      autoHideHeader: false,
      fixSiderbar: false,
      colorWeak: 'close',
    };
    const propsState = this.propsToState(props);
    this.state = { ...this.defaultstate, ...propsState };
  }

  getLayOutSetting = () => {
    const { layout } = this.state;
    return [
      {
        title: '栅格模式',
        isShow: true,
        action: [
          <Select
            value={this.state.grid}
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
            checked={!!this.state.fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />,
        ],
      },
      {
        title: '↳ 下滑时隐藏 Header',
        isShow: true,
        action: [
          <Switch
            checked={!!this.state.autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />,
        ],
      },
      {
        title: 'Fix Siderbar',
        isShow: layout === 'sidemenu',
        action: [<Switch checked={!!this.state.fixSiderbar} onChange={this.fixSiderbar} />],
      },
    ].filter(item => item.isShow);
  };
  fixSiderbar = checked => {
    this.changeSetting('fixSiderbar', checked);
  };
  changeSetting = (key, value) => {
    const nextState = {};
    nextState[key] = value;
    if (key === 'layout') {
      if (value === 'topmenu') {
        nextState.grid = 'Wide';
      } else {
        nextState.grid = 'Fluid';
      }
    }
    this.setState(nextState, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };
  propsToState = props => {
    const nextState = {};
    Object.keys(props).forEach(key => {
      if (props[key] && this.defaultstate[key] !== undefined) {
        nextState[key] = props[key];
      }
    });
    return nextState;
  };
  togglerContent = () => {
    this.changeSetting('collapse', !this.state.collapse);
  };
  render() {
    const radioStyle = {
      display: 'block',
    };
    return (
      <>
        <div className={styles.sidebar}>
          <div className={styles.mini_bar} onClick={this.togglerContent}>
            <img
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/ApQgLmeZDNJMomKNvavq.svg"
            />
          </div>
        </div>
        <DrawerMenu
          parent={null}
          level={null}
          iconChild={null}
          open={this.state.collapse}
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
                value={this.state.silderTheme}
              >
                <Radio style={radioStyle} value="dark">
                  <ColorBlock color="#002140" title="深色导航" />
                </Radio>
                <Radio style={radioStyle} value="ligth">
                  <ColorBlock color="#E9E9E9" title="浅色导航" />
                </Radio>
              </RadioGroup>
              <ThemeColor
                value={this.state.themeColor}
                onChange={color => this.changeSetting('themeColor', color)}
              />
            </Body>
            <Divider style={{ margin: 0 }} />
            <Body title="导航设置 ">
              <LayoutSeting
                value={this.state.layout}
                onChange={layout => this.changeSetting('layout', layout)}
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
                        value={this.state.colorWeak}
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
      </>
    );
  }
}

export default Sidebar;
