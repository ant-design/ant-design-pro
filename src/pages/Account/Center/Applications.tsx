import { IListModelState } from '@/models/list';
import { formatWan } from '@/utils/utils';
import { Avatar, Card, Dropdown, Icon, List, Menu, Tooltip } from 'antd';
import { connect } from 'dva';
import numeral from 'numeral';
import React from 'react';
import stylesApplications from './Applications.less';

interface ApplicationsProps {
  list: IListModelState;
}

const Center: React.FunctionComponent<ApplicationsProps> = props => {
  const {
    list: { list },
  } = props;
  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3d menu item
        </a>
      </Menu.Item>
    </Menu>
  );
  const CardInfo = ({ activeUser, newUser }) => (
    <div className={stylesApplications.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
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
            hoverable={true}
            bodyStyle={{ paddingBottom: 20 }}
            actions={[
              <Tooltip title="下载">
                <Icon type="download" />
              </Tooltip>,
              <Tooltip title="编辑">
                <Icon type="edit" />
              </Tooltip>,
              <Tooltip title="分享">
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

export default connect(({ list }) => ({
  list,
}))(Center);
