import { Button, List } from 'antd';
import React from 'react';

type Unpacked<T> = T extends (infer U)[] ? U : T;

const passwordStrength = {
  strong: <span className="strong">强</span>,
  medium: <span className="medium">中</span>,
  weak: <span className="weak">弱 Weak</span>,
};

const securityData = [
  {
    title: '账户密码',
    description: (
      <>
        当前密码强度：
        {passwordStrength.strong}
      </>
    ),
    actions: [
      <Button key="Modify" type="link">
        修改
      </Button>,
    ],
  },
  {
    title: '密保手机',
    description: `已绑定手机：138****8293`,
    actions: [
      <Button key="Modify" type="link">
        修改
      </Button>,
    ],
  },
  {
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    actions: [
      <Button key="Set" type="link">
        设置
      </Button>,
    ],
  },
  {
    title: '备用邮箱',
    description: `已绑定邮箱：ant***sign.com`,
    actions: [
      <Button key="Modify" type="link">
        修改
      </Button>,
    ],
  },
  {
    title: 'MFA 设备',
    description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    actions: [
      <Button key="bind" type="link">
        绑定
      </Button>,
    ],
  },
];

const SecurityView: React.FC = () => {
  const data = securityData;
  return (
    <List<Unpacked<typeof data>>
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item actions={item.actions}>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );
};

export default SecurityView;
