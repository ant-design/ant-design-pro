import { Badge, Icon, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import HeaderDropdown, { HeaderDropdownProps } from '../HeaderDropdown';
import styles from './index.less';
import NoticeList, { NoticeIconTabComponent, NoticeIconTabProps } from './NoticeList';

const { TabPane } = Tabs;

export interface NoticeIconData {
  avatar?: string | React.ReactNode;
  clickClose?: boolean;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  key?: string | number;
  read?: boolean;
  style?: React.CSSProperties;
  title?: React.ReactNode;
  [key: string]: any;
}

export interface NoticeIconProps<T extends NoticeIconData = NoticeIconData> {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabTitle?: string) => void;
  onItemClick?: (item: T, tabProps: NoticeIconProps<T>) => void;
  onViewMore?: (tabProps: NoticeIconProps<T>, e: React.MouseEvent) => void;
  onTabChange?: (tabTile?: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  locale?: {
    emptyText: string;
    clear: string;
    viewMore: string;
    [key: string]: string;
  };
  clearClose?: boolean;
}

export default class NoticeIcon<T extends NoticeIconData = NoticeIconData> extends Component<
  NoticeIconProps<T>
> {
  static Tab: NoticeIconTabComponent = () => null;

  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    onViewMore: () => {},
    loading: false,
    clearClose: false,
    locale: {
      emptyText: 'No notifications',
      clear: 'Clear',
      viewMore: 'More',
    },
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  popover: HTMLElement = null!;
  state = {
    visible: false,
  };

  onItemClick = (item: T, tabProps: NoticeIconProps<T>) => {
    const { onItemClick } = this.props;
    const { clickClose } = item;
    onItemClick!(item, tabProps);
    if (clickClose) {
      this.popover.click();
    }
  };

  onClear = (title?: string) => {
    const { onClear, clearClose } = this.props;
    onClear!(title);
    if (clearClose) {
      this.popover.click();
    }
  };

  getNotificationBox() {
    const { children, loading, locale, onTabChange, onViewMore } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(
      children as React.FunctionComponentElement<NoticeIconTabProps<T>>,
      child => {
        const { list, title: tabTitle, count, className, style, ...restProps } = child.props;
        const len = list && list.length ? list.length : 0;
        const msgCount = count || count === 0 ? count : len;
        const localeTitle = tabTitle && (locale![tabTitle] || tabTitle);
        const tabTitleWithCount = msgCount > 0 ? `${localeTitle} (${msgCount})` : localeTitle;
        return (
          <TabPane className={className} key={tabTitle} style={style} tab={tabTitleWithCount}>
            <NoticeList<T>
              {...restProps}
              list={list}
              locale={locale!}
              onClear={() => this.onClear(tabTitle)}
              onClick={item => this.onItemClick(item, child.props)}
              onViewMore={event => onViewMore!(child.props, event)}
              title={tabTitle}
            />
          </TabPane>
        );
      },
    );
    return (
      <Fragment>
        <Spin spinning={loading} delay={0}>
          <Tabs className={styles.tabs} onChange={onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </Fragment>
    );
  }

  handleVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    this.setState({ visible });
    onPopupVisibleChange!(visible);
  };

  render() {
    const { className, count, popupVisible, bell } = this.props;
    const { visible } = this.state;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
    const trigger = (
      <span className={classNames(noticeButtonClass, { opened: visible })}>
        <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps: Partial<HeaderDropdownProps> = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        {...popoverProps}
        ref={node => (this.popover = ReactDOM.findDOMNode(node) as HTMLElement)} // eslint-disable-line
      >
        {trigger}
      </HeaderDropdown>
    );
  }
}
