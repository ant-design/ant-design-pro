import React, { Component } from 'react';
import Link from 'umi/link';
import RightContent from '../GlobalHeader/RightContent';
import BaseMenu from '../SiderMenu/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils';
import styles from './index.less';
import defaultSettings from '../../../config/defaultSettings';

export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';
export declare type MenuMode =
  | 'vertical'
  | 'vertical-left'
  | 'vertical-right'
  | 'horizontal'
  | 'inline';

const { title } = defaultSettings;
interface TopNavHeaderProps {
  theme: SiderTheme;
  contentWidth?: string;
  menuData?: any[];
  logo?: string;
  mode?: MenuMode;
  flatMenuKeys?: any[];
  onCollapse?: (collapsed: boolean, type?: CollapseType) => void;
  isMobile?: boolean;
  openKeys?: any;
  className?: string;
  collapsed?: boolean;
  handleOpenChange?: (openKeys: any[]) => void;
  style?: React.CSSProperties;
  onOpenChange?: (openKeys: string[]) => void;
  onNoticeClear?: (type: string) => void;
  onMenuClick?: ({ key: string }) => void;
  onNoticeVisibleChange?: (b: boolean) => void;
}

interface TopNavHeaderState {
  maxWidth: undefined | number;
}

export default class TopNavHeader extends Component<TopNavHeaderProps, TopNavHeaderState> {
  state = {
    maxWidth: undefined,
  };

  maim: HTMLDivElement;

  static getDerivedStateFromProps(props) {
    return {
      maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40,
    };
  }

  render() {
    const { theme, contentWidth, menuData, logo } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>{title}</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth,
              }}
            >
              <BaseMenu {...this.props} flatMenuKeys={flatMenuKeys} className={styles.menu} />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}
