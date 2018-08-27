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
  getLayOutSetting = () => {
    const {
      setting: { grid, fixedHeader, layout, autoHideHeader, fixSiderbar },
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
        hide: layout === 'topmenu',
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
        handler={
          <div className={styles.handle}>
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
        }
        onHandleClick={this.togglerContent}
        style={{
          zIndex: 999,
        }}
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

          <ThemeColor
            value={themeColor}
            onChange={color => this.changeSetting('themeColor', color)}
          />

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
            onCopy={() =>
              message.success(
                'copy success，please replace defaultSetting in src/models/setting.js'
              )
            }
          >
            <Button
              style={{
                width: 224,
              }}
            >
              <Icon type="copy" />
              拷贝配置
            </Button>
          </CopyToClipboard>
        </div>
      </Drawer>
    );
  }
}

export default SettingDarwer;
