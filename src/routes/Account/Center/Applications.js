import React from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { formatWan } from '../../../utils/utils';
import stylesApplications from '../../List/Applications.less';

export default props => {
  const { list } = props;
  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  const CardInfo = ({ activeUser, newUser }) => (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>Active User</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>New User</p>
        <p>{newUser}</p>
      </div>
    </div>
  );
  return (
    <List
      rowKey="id"
      className={stylesApplications.filterCardList}
      grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
      dataSource={list}
      renderItem={item => (
        <List.Item key={item.id}>
          <Card
            hoverable
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip title="Download">
                <Icon type="download" />
              </Tooltip>,
              <Tooltip title="Edit">
                <Icon type="edit" />
              </Tooltip>,
              <Tooltip title="Share">
                <Icon type="share-alt" />
              </Tooltip>,
              <Dropdown overlay={itemMenu}>
                <Icon type="ellipsis" />
              </Dropdown>,
            ]}
          >
            <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
            <div className={stylesApplications.cardItemContent}>
              <CardInfo
                activeUser={formatWan(item.activeUser)}
                newUser={numeral(item.newUser).format('0,0')}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};
