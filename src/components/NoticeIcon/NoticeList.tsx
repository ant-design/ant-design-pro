import { Avatar, List } from 'antd';
import classNames from 'classnames';
import React, { PropsWithChildren, ReactElement } from 'react';
import { NoticeIconData } from './index';
import styles from './NoticeList.less';

export interface NoticeIconTabProps<T extends NoticeIconData = NoticeIconData> {
  className?: string;
  count?: number;
  emptyText?: React.ReactNode;
  emptyImage?: string;
  list?: T[];
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title?: string;
}

export type NoticeIconTabComponent<T extends NoticeIconData = NoticeIconData> = React.FC<
  NoticeIconTabProps<T>
>;

interface NoticeListProps<T extends NoticeIconData = NoticeIconData> extends NoticeIconTabProps<T> {
  onClick: (item: T) => void;
  onClear: (event: React.MouseEvent) => void;
  onViewMore: (event: React.MouseEvent) => void;
  locale: {
    emptyText: string;
    clear: string;
    viewMore: string;
    [key: string]: string;
  };
  /**
   * `className` and `style` will take effect in TabPanel
   */
  className?: never;
  style?: never;
}

type NoticeListComponent = <T extends NoticeIconData = NoticeIconData>(
  props: PropsWithChildren<NoticeListProps<T>>,
) => ReactElement | null;

const NoticeList: NoticeListComponent = ({
  list = [],
  onClick,
  onClear,
  title: tabTitle,
  locale,
  emptyText,
  emptyImage,
  onViewMore,
  showClear = true,
  showViewMore = false,
}) => {
  if (list.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list} renderItem={null}>
        {list.map((item, i) => {
          const itemCls = classNames(styles.item, { [styles.read]: item.read });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
              <span className={styles.iconElement}>{item.avatar}</span>
            )
          ) : null;
          const ListItemTitle = (
            <div className={styles.title}>
              {item.title}
              <div className={styles.extra}>{item.extra}</div>
            </div>
          );
          const ListItemDesc = (
            <div>
              <div
                className={styles.description}
                title={typeof item.description === 'string' ? item.description : void 0}
              >
                {item.description}
              </div>
              <div className={styles.datetime}>{item.datetime}</div>
            </div>
          );
          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={ListItemTitle}
                description={ListItemDesc}
              />
            </List.Item>
          );
        })}
      </List>
      <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {locale.clear} {tabTitle && (locale![tabTitle] || tabTitle)}
          </div>
        ) : null}
        {showViewMore ? <div onClick={onViewMore}>{locale.viewMore}</div> : null}
      </div>
    </div>
  );
};

export default NoticeList;
