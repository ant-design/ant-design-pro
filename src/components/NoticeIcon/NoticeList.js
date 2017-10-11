import React from 'react';
import { Avatar, Icon, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({ data = [], onClick, onClear, title, locale }) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        <Icon type="frown-o" />
        {locale.emptyText}
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <List.Item.Meta
                avatar={item.avatar ? <Avatar className={styles.avatar} src={item.avatar} /> : null}
                title={
                  <div>
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
            </List.Item>
          );
        })}
      </List>
      <div className={styles.clear} onClick={onClear}>
        {locale.clear}{title}
      </div>
    </div>
  );
}
