import { Badge, Icon, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import HeaderDropdown, { HeaderDropdownProps } from '../HeaderDropdown';
import styles from './index.less';
import NoticeList from './NoticeList';

const { TabPane } = Tabs;

export interface NoticeIconData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string) => void;
  onItemClick?: (item: NoticeIconData, tabProps: NoticeIconProps) => void;
  onViewMore?: (tabProps: NoticeIconProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
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

export default class NoticeIcon extends Component<NoticeIconProps> {
  static Tab = TabPane;

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

  popover: any;
  state = {
    visible: false,
  };

  onItemClick = (item, tabProps) => {
    const { onItemClick } = this.props;
    const { clickClose } = item;
    onItemClick(item, tabProps);
    if (clickClose) {
      this.popover.click();
    }
  };

  onClear = name => {
    const { onClear, clearClose } = this.props;
    onClear(name);
    if (clearClose) {
      this.popover.click();
    }
  };

  onTabChange = tabType => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  onViewMore = (tabProps, event) => {
    const { onViewMore } = this.props;
    onViewMore(tabProps, event);
  };

  getNotificationBox() {
    const { children, loading, locale } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, (child: any) => {
      const { list, title, count, emptyText, emptyImage, showClear, showViewMore } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const localeTitle = locale[title] || title;
      const tabTitle = msgCount > 0 ? `${localeTitle} (${msgCount})` : localeTitle;
      return (
        <TabPane tab={tabTitle} key={title}>
          <NoticeList
            data={list}
            emptyImage={emptyImage}
            emptyText={emptyText}
            locale={locale}
            onClear={() => this.onClear(title)}
            onClick={item => this.onItemClick(item, child.props)}
            onViewMore={event => this.onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>
      );
    });
    return (
      <Fragment>
        <Spin spinning={loading} delay={0}>
          <Tabs className={styles.tabs} onChange={this.onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </Fragment>
    );
  }

  handleVisibleChange = visible => {
    const { onPopupVisibleChange } = this.props;
    this.setState({ visible });
    onPopupVisibleChange(visible);
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
    const popoverProps: any = {};
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
        ref={node => (this.popover = ReactDOM.findDOMNode(node))} // eslint-disable-line
      >
        {trigger}
      </HeaderDropdown>
    );
  }
}
