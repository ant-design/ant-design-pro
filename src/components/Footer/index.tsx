import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

import packageJson from '@/../package.json';

// Git commit hash, can be updated via CI/CD
const COMMIT_HASH = process.env.COMMIT_HASH || '';

const Footer: React.FC = () => {
  const commitUrl = `https://github.com/ant-design/ant-design-pro/commit/${COMMIT_HASH}`;

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={'Powered by Ant Design | v' + packageJson.version}
      links={[
        {
          key: 'version',
          title: packageJson.version,
          href: commitUrl,
          blankTarget: true,
        },
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: 'Ant Design',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
