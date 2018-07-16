import React, { PureComponent } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    const {
      setting: { themeColor, colorWeak },
    } = this.props;
    // Determine if the component is remounted
    if (themeColor !== '#1890FF' && themeColor !== window['antd_pro_less_color']) {
      window.less.refresh().then(() => {
        this.colorChange(themeColor);
      });
    }
    if (colorWeak === 'open') {
      document.body.className = 'colorWeak';
    }
  }

  getLayOutSetting = () => {
    const {
      setting: { grid, fixedHeader, autoHideHeader, fixSiderbar },
    } = this.props;
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
            <Select.Option value="Wide">定宽</Select.Option>
            <Select.Option value="Fluid">流式</Select.Option>
          </Select>,
        ],
      },
      {
        title: '固定 Header',
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
        hide: !fixedHeader,
        action: [
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />,
        ],
      },
      {
        title: '固定 Siderbar',
        action: [
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />,
        ],
      },
    ].filter(item => {
      return !item.hide;
    });
  };

  changeSetting = (key, value) => {
    const { setting } = this.props;
    const nextState = { ...setting };
    nextState[key] = value;
    if (key === 'layout') {
      if (value === 'topmenu') {
        nextState.grid = 'Wide';
      } else {
        nextState.grid = 'Fluid';
      }
    }
    if (key === 'fixedHeader') {
      if (!value) {
        nextState.autoHideHeader = false;
      }
    }
    if (key === 'colorWeak') {
      if (value) {
        document.body.className = 'colorWeak';
      } else {
        document.body.className = '';
      }
    }
    this.setState(nextState, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'setting/changeSetting',
        payload: this.state,
      });
    });
  };

  togglerContent = () => {
    const { setting } = this.props;
    this.changeSetting('collapse', !setting.collapse);
  };

  colorChange = color => {
    this.changeSetting('themeColor', color);
    const hideMessage = message.loading('正在编译主题！', 0);
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': color,
          '@input-hover-border-color': color,
        })
        .then(() => {
          window['antd_pro_less_color'] = color;
          hideMessage();
        })
        .catch(() => {
          message.error(`Failed to update theme`);
        });
    }, 200);
  };

  render() {
    const { setting } = this.props;
    const { collapse, silderTheme, themeColor, layout, colorWeak } = setting;
    return (
      <Drawer
        firstEnter={true}
        visible={collapse}
        width={273}
        onClose={this.togglerContent}
        placement="right"
        style={{
          zIndex: 999,
        }}
      >
        <div className={styles.handle} onClick={this.togglerContent}>
          {!collapse ? (
            <Icon
              type="setting"
              style={{
                color: '#FFF',
                fontSize: 20,
              }}
            />
          ) : (
            <Icon
              type="close"
              style={{
                color: '#FFF',
                fontSize: 20,
              }}
            />
          )}
        </div>
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

          <Divider />

          <Body title="其他设置 ">
            <List.Item
              actions={[
                <Switch
                  size="small"
                  checked={!!colorWeak}
                  onChange={checked => this.changeSetting('colorWeak', checked)}
                />,
              ]}
            >
              色弱模式
            </List.Item>
          </Body>
          <Divider />
          <CopyToClipboard
            text={JSON.stringify(setting)}
            onCopy={() => message.success('copy success')}
          >
            <Button
              style={{
                width: 224,
              }}
            >
              <Icon type="copy" />拷贝代码
            </Button>
          </CopyToClipboard>
        </div>
      </Drawer>
    );
  }
}

export default SettingDarwer;
