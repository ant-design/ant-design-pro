import React from 'react';
import styles from './ItemView.less';

const ItemView = ({ icon, title, subTitle, action, onClick }) => (
  <div className={styles.item}>
    {icon ? <div className={styles.avatar}>{icon}</div> : null}
    <div className={styles.content}>
      <div className={styles.title}>{title}</div>
      <div className={styles.sub_View}>
        <div className={styles.sub_title}>{subTitle}</div>
        <div className={styles.action} onClick={onClick || null}>
          {action}
        </div>
      </div>
    </div>
  </div>
);

export default ItemView;
