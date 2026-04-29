import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import packageJson from '@root/package.json';
import React from 'react';

const getRepoUrl = () => {
  if (!packageJson.repository)
    return 'https://github.com/ant-design/ant-design-pro';
  const repo =
    typeof packageJson.repository === 'string'
      ? packageJson.repository
      : (packageJson.repository as { url: string }).url;
  // Parse git URLs like git@github.com:owner/name.git or https://github.com/owner/name.git
  const match = repo.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (!match) return 'https://github.com/ant-design/ant-design-pro';
  return `https://github.com/${match[1]}/${match[2]}`;
};

const REPO_URL = getRepoUrl();

// Git commit hash, can be updated via CI/CD (GitHub Actions or Cloudflare Pages)
const COMMIT_HASH =
  process.env.COMMIT_HASH || process.env.CF_PAGES_COMMIT_SHA || '';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      copyright={false}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'version',
          title: `v${__APP_VERSION__}`,
          href: REPO_URL,
          blankTarget: true,
        },
        ...(COMMIT_HASH
          ? [
              {
                key: 'commit',
                title: COMMIT_HASH.slice(0, 7),
                href: `${REPO_URL}/commit/${COMMIT_HASH}`,
                blankTarget: true,
              },
            ]
          : []),
        {
          key: 'repo',
          title: (
            <>
              <GithubOutlined style={{ marginRight: 8 }} />
              Ant Design Pro
            </>
          ),
          href: REPO_URL,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
