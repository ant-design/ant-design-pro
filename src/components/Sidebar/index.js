import React, { PureComponent, Fragment } from 'react';
import { Icon, Select, List, Switch, Divider, Radio } from 'antd';
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

const Body = ({ children, title }) => (
  <div
    style={{
      padding: 24,
    }}
  >
    <h3>{title}</h3>
    {children}
  </div>
);

class Sidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultstate = {
      collapse: false,
      silderTheme: 'dark',
      themeColor: '#1890ff',
      layout: 'left',
      grid: 'Wide',
      fixedHeader: false,
      autoHideHeader: false,
      fixSiderbar: false,
      colorWeak: false,
    };
    const propsState = this.propsToState(props);
    this.state = { ...this.defaultstate, ...propsState };
  }
  componentWillReceiveProps(props) {
    this.setState(this.propsToState(props));
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
            checked={this.state.fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />,
        ],
      },
      {
        title: '下滑隐藏 Header',
        isShow: true,
        action: [
          <Switch
            checked={this.state.autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />,
        ],
      },
      {
        title: 'Fix Siderbar',
        isShow: layout === 'left',
        action: [
          <Switch
            checked={this.state.fixSiderbar}
            onChange={this.fixSiderbar}
          />,
        ],
      },
    ].filter(item => item.isShow);
  };
  fixSiderbar = (checked) => {
    this.changeSetting('fixSiderbar', checked);
  }
  changeSetting = (key, value) => {
    const nextState = {};
    nextState[key] = value;
    if (key === 'layout') {
      if (value === 'top') {
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
  propsToState = (props) => {
    const nextState = {};
    Object.keys(props).forEach((key) => {
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
      <div
        className={`${styles.sidebar} ${
          this.state.collapse ? styles.show : ''
        }`}
      >
        <div className={styles.mini_bar} onClick={this.togglerContent}>
          <Icon type="book" />
        </div>
        <div className={styles.content}>
          <Body title="整体风格设置">
            <RadioGroup
              onChange={({ target }) =>
                this.changeSetting('silderTheme', target.value)
              }
              value={this.state.silderTheme}
            >
              <Radio style={radioStyle} value="dark">
                <ColorBlock color="#001529" title="深色导航" />
              </Radio>
              <Radio style={radioStyle} value="ligth">
                <ColorBlock color="#ddd" title="浅色导航" />
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
              renderItem={item => (
                <List.Item actions={item.action}>{item.title}</List.Item>
              )}
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
                    <Switch
                      checked={this.state.colorWeak}
                      onChange={checked =>
                        this.changeSetting('colorWeak', checked)
                      }
                    />,
                  ],
                },
              ]}
              renderItem={item => (
                <List.Item actions={item.action}>{item.title}</List.Item>
              )}
            />
          </Body>
        </div>
      </div>
    );
  }
}

export default Sidebar;
