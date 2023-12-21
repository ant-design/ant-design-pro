import { DefaultFooter } from '@ant-design/pro-components';
import defaultSettings from 'config/defaultSettings';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = defaultSettings?.title;
  const currentYear = new Date().getFullYear();
  const branchName = process.env.FRONTEND_BRANCH_NAME || 'release_v1.0.0';
  const version = branchName.replace('release_', '');

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage} ${version}`}
      // links={[
      //   {
      //     key: '',
      //     title: '',
      //     href: '#',
      //     blankTarget: true,
      //   },
      // ]}
    />
  );
};

export default Footer;
