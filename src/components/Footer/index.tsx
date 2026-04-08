import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import GitUrlParse from 'git-url-parse';
import React from 'react';

import packageJson from '@/../package.json';

const getRepoFromPackageJson = () => {
  const repoUrl = packageJson.repository;
  if (!repoUrl) return 'ant-design/ant-design-pro';
  const parsed = GitUrlParse(repoUrl);
  return `${parsed.owner}/${parsed.name}`;
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
      copyright={false}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'main',
          title: (
            <>
              v{packageJson.version}
              {COMMIT_HASH && <span> · {COMMIT_HASH.slice(0, 7)}</span>}{' '}
              <GithubOutlined />
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
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
