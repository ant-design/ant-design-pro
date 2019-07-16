import React, { Component } from 'react';
import { Tag, message } from 'antd';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

import { NoticeItem } from '@/models/global';
import NoticeIcon from '../NoticeIcon';
import { CurrentUser } from '@/models/user';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  notices?: NoticeItem[];
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  changeReadState = (clickedItem: NoticeItem): void => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = (title: string, key: string) => {
    const { dispatch } = this.props;
    message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${title}`);
    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  getNoticeData = (): { [key: string]: NoticeItem[] } => {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime as string).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData: { [key: string]: NoticeItem[] }) => {
    const unreadMsg: { [key: string]: number } = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);

    return (
      <NoticeIcon
        className={styles.action}
        count={currentUser && currentUser.unreadCount}
        onItemClick={item => {
          this.changeReadState(item as NoticeItem);
        }}
        loading={fetchingNotices}
        clearText={formatMessage({ id: 'component.noticeIcon.clear' })}
        viewMoreText={formatMessage({ id: 'component.noticeIcon.view-more' })}
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={unreadMsg.notification}
          list={noticeData.notification}
          title={formatMessage({ id: 'component.globalHeader.notification' })}
          emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          count={unreadMsg.message}
          list={noticeData.message}
          title={formatMessage({ id: 'component.globalHeader.message' })}
          emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title={formatMessage({ id: 'component.globalHeader.event' })}
          emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
          count={unreadMsg.event}
          list={noticeData.event}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
