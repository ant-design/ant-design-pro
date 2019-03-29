import { ConnectState, ListModelState } from '@/models/connect';
import { MockListItem } from '@/models/list';
import ArticleListContent from '@/components/ArticleListContent';
import { Icon, List, Tag } from 'antd';
import { connect } from 'dva';
import React from 'react';
import styles from './Articles.less';

interface ArticlesProps {
  list: ListModelState;
}

const IconText: React.FC<{ type: string; text: React.ReactNode }> = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const Center: React.FC<ArticlesProps> = props => {
  const {
    list: { list },
  } = props;
  return (
    <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item: MockListItem) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText type="star-o" text={item.star} />,
            <IconText type="like-o" text={item.like} />,
            <IconText type="message" text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default connect(({ list }: ConnectState) => ({
  list,
}))(Center);
