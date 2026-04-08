import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

import packageJson from '@/../package.json';

// Extract repo from package.json repository field (e.g., "git@github.com:ant-design/ant-design-pro.git" -> "ant-design/ant-design-pro")
const getRepoFromPackageJson = () => {
  const repoUrl = packageJson.repository;
  if (!repoUrl) return 'ant-design/ant-design-pro';
  const match = repoUrl.match(/[:/]([^:]+\/[^.]+)\.git$/);
  return match ? match[1] : 'ant-design/ant-design-pro';
};

const REPO = getRepoFromPackageJson();

// Git commit hash, can be updated via CI/CD
const COMMIT_HASH = process.env.COMMIT_HASH || '';

const Footer: React.FC = () => {
  const repo = REPO;
  const commitUrl = COMMIT_HASH
    ? `https://github.com/${repo}/commit/${COMMIT_HASH}`
    : undefined;
  const repoUrl = `https://github.com/${repo}`;

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'main',
          title: (
            <>
              v{packageJson.version}
              {COMMIT_HASH && <span> · {COMMIT_HASH.slice(0, 7)}</span>}
              <GithubOutlined />
              <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                Ant Design Pro
              </a>
            </>
          ),
          href: repoUrl,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
