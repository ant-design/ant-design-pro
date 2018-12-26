import React from 'react';
import { Avatar, List, Skeleton } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
  loading,
  onLoadMore,
  loadedAll = true,
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
  const LoadMore = loadedAll ? undefined : (
    <div style={{ margin: '8px 0 20px 0', textAlign: 'center' }}>
      <a onClick={onLoadMore}>{locale.loadMore}</a>
    </div>
  );
  return (
    <div>
      <List className={styles.list} loadMore={LoadMore}>
        {[...data, ...loadingList].map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
                item.avatar
              )
          ) : null;

          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <Skeleton avatar title={false} active {...skeletonProps} loading={item.loading}>
                <List.Item.Meta
                  className={styles.meta}
                  avatar={<span className={styles.iconElement}>{leftIcon}</span>}
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
      {showClear ? (
        <div className={styles.clear} onClick={onClear}>
          {locale.clear} {title}
        </div>
      ) : null}
    </div>
  );
}
