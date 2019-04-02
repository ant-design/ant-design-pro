import React, { Component } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button, Alert, Tooltip } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'dva';
import omit from 'omit.js';
import styles from './index.less';
import ThemeColor from './ThemeColor';
import BlockCheckbox from './BlockCheckbox';

const { Option } = Select;

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
class SettingDrawer extends Component {
  state = {
    collapse: false,
  };

  getLayoutSetting = () => {
    const {
      setting: { contentWidth, fixedHeader, layout, autoHideHeader, fixSiderbar },
    } = this.props;
    return [
      {
        title: formatMessage({ id: 'app.setting.content-width' }),
        action: (
          <Select
            value={contentWidth}
            size="small"
            onSelect={value => this.changeSetting('contentWidth', value)}
            style={{ width: 80 }}
          >
            {layout === 'sidemenu' ? null : (
              <Option value="Fixed">
                {formatMessage({ id: 'app.setting.content-width.fixed' })}
              </Option>
            )}
            <Option value="Fluid">
              {formatMessage({ id: 'app.setting.content-width.fluid' })}
            </Option>
          </Select>
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.fixedheader' }),
        action: (
          <Switch
            size="small"
            checked={!!fixedHeader}
            onChange={checked => this.changeSetting('fixedHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.hideheader' }),
        disabled: !fixedHeader,
        disabledReason: formatMessage({ id: 'app.setting.hideheader.hint' }),
        action: (
          <Switch
            size="small"
            checked={!!autoHideHeader}
            onChange={checked => this.changeSetting('autoHideHeader', checked)}
          />
        ),
      },
      {
        title: formatMessage({ id: 'app.setting.fixedsidebar' }),
        disabled: layout === 'topmenu',
        disabledReason: formatMessage({ id: 'app.setting.fixedsidebar.hint' }),
        action: (
          <Switch
            size="small"
            checked={!!fixSiderbar}
            onChange={checked => this.changeSetting('fixSiderbar', checked)}
          />
        ),
      },
    ];
  };

  changeSetting = (key, value) => {
    const { setting } = this.props;
    const nextState = { ...setting };
    nextState[key] = value;
    if (key === 'layout') {
      nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
    } else if (key === 'fixedHeader' && !value) {
      nextState.autoHideHeader = false;
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
    const { collapse } = this.state;
    this.setState({ collapse: !collapse });
  };

  renderLayoutSettingItem = item => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

  render() {
    const { setting } = this.props;
    const { navTheme, primaryColor, layout, colorWeak } = setting;
    const { collapse } = this.state;
    return (
      <Drawer
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
        handler={
          <div className={styles.handle} onClick={this.togglerContent}>
            <Icon
              type={collapse ? 'close' : 'setting'}
              style={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </div>
        }
        style={{
          zIndex: 999,
        }}
      >
        <div className={styles.content}>
          <Body title={formatMessage({ id: 'app.setting.pagestyle' })}>
            <BlockCheckbox
              list={[
                {
                  key: 'dark',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                  title: formatMessage({ id: 'app.setting.pagestyle.dark' }),
                },
                {
                  key: 'light',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                  title: formatMessage({ id: 'app.setting.pagestyle.light' }),
                },
              ]}
              value={navTheme}
              onChange={value => this.changeSetting('navTheme', value)}
            />
          </Body>

          <ThemeColor
            title={formatMessage({ id: 'app.setting.themecolor' })}
            value={primaryColor}
            onChange={color => this.changeSetting('primaryColor', color)}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.navigationmode' })}>
            <BlockCheckbox
              list={[
                {
                  key: 'sidemenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                  title: formatMessage({ id: 'app.setting.sidemenu' }),
                },
                {
                  key: 'topmenu',
                  url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                  title: formatMessage({ id: 'app.setting.topmenu' }),
                },
              ]}
              value={layout}
              onChange={value => this.changeSetting('layout', value)}
            />
          </Body>

          <List
            split={false}
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
          />

          <Divider />

          <Body title={formatMessage({ id: 'app.setting.othersettings' })}>
            <List
              split={false}
              renderItem={this.renderLayoutSettingItem}
              dataSource={[
                {
                  title: formatMessage({ id: 'app.setting.weakmode' }),
                  action: (
                    <Switch
                      size="small"
                      checked={!!colorWeak}
                      onChange={checked => this.changeSetting('colorWeak', checked)}
                    />
                  ),
                },
              ]}
            />
          </Body>
          <Divider />
          <CopyToClipboard
            text={JSON.stringify(omit(setting, ['colorWeak']), null, 2)}
            onCopy={() => message.success(formatMessage({ id: 'app.setting.copyinfo' }))}
          >
            <Button block icon="copy">
              {formatMessage({ id: 'app.setting.copy' })}
            </Button>
          </CopyToClipboard>
          <Alert
            type="warning"
            className={styles.productionHint}
            message={
              <div>
                {formatMessage({ id: 'app.setting.production.hint' })}{' '}
                <a
                  href="https://u.ant.design/pro-v2-default-settings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  src/defaultSettings.js
                </a>
              </div>
            }
          />
        </div>
      </Drawer>
    );
  }
}

export default SettingDrawer;
