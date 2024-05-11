import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        // {
        //   key: 'Pro',
        //   title: 'Pro',
        //   href: '',
        //   blankTarget: true,
        // },
        // {
        //   key: '@@@',
        //   title: <GithubOutlined />,
        //   href: '',
        //   blankTarget: true,
        // },
        {
          key: 'copyright',
          title: "2024",
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
