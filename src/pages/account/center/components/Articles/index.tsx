import { StarTwoTone, LikeOutlined, MessageFilled } from '@ant-design/icons';
import { List, Tag } from 'antd';
import React from 'react';

import { connect } from 'umi';
import ArticleListContent from '../ArticleListContent';
import { ListItemDataType } from '../../data.d';
import { ModalState } from '../../model';
import styles from './index.less';

const Articles: React.FC<Partial<ModalState>> = (props) => {
  const { list } = props;
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );
  return (
    <List<ListItemDataType>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
            <IconText key="message" icon={<MessageFilled />} text={item.message} />,
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

export default connect(({ accountAndcenter }: { accountAndcenter: ModalState }) => ({
  list: accountAndcenter.list,
}))(Articles);
