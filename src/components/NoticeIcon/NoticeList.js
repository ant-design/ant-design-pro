import React from 'react';
import { Avatar, List, Skeleton } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

let ListElement = null;

export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
  loading,
  visible,
  loadedAll = true,
  onLoadMore = null,
  scrollToLoad = true,
  showClear = true,
  skeletonCount = 5,
  skeletonProps = {},
}) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  const loadingList = Array.from({ length: loading ? skeletonCount : 0 }).map(() => ({ loading }));
  const onScroll = event => {
    if (!scrollToLoad || loading || loadedAll) return;
    if (typeof onLoadMore !== 'function') return;
    const { currentTarget: t } = event;
    if (t.scrollHeight - t.scrollTop - t.clientHeight <= 40) {
      onLoadMore(event);
      ListElement = t;
    }
  };
  if (!visible && ListElement) {
    try {
      ListElement.scrollTo(null, 0);
    } catch (err) {
      ListElement = null;
    }
  }
  return (
    <div>
      <List className={styles.list} onScroll={onScroll}>
        {[...data, ...loadingList].map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
              <span className={styles.iconElement}>{item.avatar}</span>
            )
          ) : null;

          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <Skeleton avatar title={false} active {...skeletonProps} loading={item.loading}>
                <List.Item.Meta
                  className={styles.meta}
                  avatar={leftIcon}
                  title={
                    <div className={styles.title}>
                      {item.title}
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.description} title={item.description}>
                        {item.description}
                      </div>
                      <div className={styles.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </Skeleton>
            </List.Item>
          );
        })}
      </List>
      <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {locale.clear} {title}
          </div>
        ) : null}
        {onLoadMore ? (
          <div
            className={classNames({ [styles.disabled]: loading || loadedAll })}
            onClick={loadedAll ? null : onLoadMore}
          >
            {loadedAll ? locale.loadedAll : locale.loadMore}
          </div>
        ) : null}
      </div>
    </div>
  );
}
