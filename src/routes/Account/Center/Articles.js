import React from 'react';
import { List, Icon, Avatar, Tag } from 'antd';
import moment from 'moment';
import stylesArticles from '../../List/Articles.less';
import styles from './Articles.less';

export default (props) => {
  const { list } = props;
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
    <div className={stylesArticles.listContent}>
      <div className={stylesArticles.description}>{content}</div>
      <div className={stylesArticles.extra}>
        <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
        <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  );
  return (
    <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText type="star-o" text={item.star} />,
            <IconText type="like-o" text={item.like} />,
            <IconText type="message" text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={(
              <a className={stylesArticles.listItemMetaTitle} href={item.href}>{item.title}</a>
            )}
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </span>
            }
          />
          <ListContent data={item} />
        </List.Item>
      )}
    />
  );
};
