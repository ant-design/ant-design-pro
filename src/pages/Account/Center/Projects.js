import React from 'react';
import { List, Card } from 'antd';
import moment from 'moment';
import AvatarList from '../../../components/AvatarList';
import stylesProjects from '../../List/Search/Projects.less';

export default props => {
  const { list } = props;
  return (
    <List
      className={stylesProjects.coverCardList}
      rowKey="id"
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={item => (
        <List.Item>
          <Card
            className={stylesProjects.card}
            hoverable
            cover={<img alt={item.title} src={item.cover} />}
          >
            <Card.Meta title={<a href="#">{item.title}</a>} description={item.subDescription} />
            <div className={stylesProjects.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={stylesProjects.avatarList}>
                <AvatarList size="mini">
                  {item.members.map(member => (
                    <AvatarList.Item
                      key={`${item.id}-avatar-${member.id}`}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
