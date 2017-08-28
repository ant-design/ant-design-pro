import React from 'react';
import { Avatar, Icon } from 'antd';
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
      <ul className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          return (
            <li className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <div className={styles.wrapper}>
                {item.avatar ? <Avatar className={styles.avatar} src={item.avatar} /> : null}
                <div className={styles.content}>
                  <h4 className={styles.title} title={item.title}>{item.title}</h4>
                  <div className={styles.description} title={item.description}>
                    {item.description}
                  </div>
                  <div className={styles.datetime}>{item.datetime}</div>
                  <div className={styles.extra}>{item.extra}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.clear} onClick={onClear}>
        {locale.clear}{title}
      </div>
    </div>
  );
}
