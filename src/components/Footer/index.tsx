import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import packageJson from '@root/package.json';
import GitUrlParse from 'git-url-parse';
import React from 'react';

const getRepoFromPackageJson = () => {
  if (!packageJson.repository) return 'ant-design/ant-design-pro';
  const parsed = GitUrlParse(packageJson.repository);
  return `https://github.com/${parsed.owner}/${parsed.name}`;
};

const REPO = getRepoFromPackageJson();

// Git commit hash, can be updated via CI/CD (GitHub Actions or Cloudflare Pages)
const COMMIT_HASH =
  process.env.COMMIT_HASH || process.env.CF_PAGES_COMMIT_SHA || '';

const Footer: React.FC = () => {
  const repo = REPO;
  const commitUrl = COMMIT_HASH
    ? `https://github.com/${repo}/commit/${COMMIT_HASH}`
    : undefined;
  const repoUrl = REPO;

  return (
    <DefaultFooter
      copyright={false}
      style={{
        background: 'none',
      }}
      links={[
        {
          key: 'version',
          title: `v${packageJson.version}`,
        },
        ...(COMMIT_HASH
          ? [
              {
                key: 'commit',
                title: COMMIT_HASH.slice(0, 7),
                href: commitUrl,
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
          href: repoUrl,
        },
      ]}
    />
  );
};

export default Footer;
