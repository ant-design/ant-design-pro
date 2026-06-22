import {
  AlipayOutlined,
  DingdingOutlined,
  TaobaoOutlined,
} from '@ant-design/icons';
import { Button, List } from 'antd';
import React from 'react';

const bindingData = [
  {
    title: '绑定淘宝',
    description: '当前未绑定淘宝账号',
    actions: [
      <Button key="Bind" type="link">
        绑定
      </Button>,
    ],
    avatar: <TaobaoOutlined className="taobao" />,
  },
  {
    title: '绑定支付宝',
    description: '当前未绑定支付宝账号',
    actions: [
      <Button key="Bind" type="link">
        绑定
      </Button>,
    ],
    avatar: <AlipayOutlined className="alipay" />,
  },
  {
    title: '绑定钉钉',
    description: '当前未绑定钉钉账号',
    actions: [
      <Button key="Bind" type="link">
        绑定
      </Button>,
    ],
    avatar: <DingdingOutlined className="dingding" />,
  },
];

const BindingView: React.FC = () => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={bindingData}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta
            avatar={item.avatar}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default BindingView;
