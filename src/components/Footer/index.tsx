import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import packageJson from '@root/package.json';
import GitUrlParse from 'git-url-parse';
import React from 'react';

const getRepoUrl = () => {
  if (!packageJson.repository)
    return 'https://github.com/ant-design/ant-design-pro';
  const parsed = GitUrlParse(packageJson.repository);
  return `https://github.com/${parsed.owner}/${parsed.name}`;
};

const REPO = getRepoUrl();

// Git commit hash, can be updated via CI/CD (GitHub Actions or Cloudflare Pages)
const COMMIT_HASH =
  process.env.COMMIT_HASH || process.env.CF_PAGES_COMMIT_SHA || '';

const Footer: React.FC = () => {
  const commitUrl = COMMIT_HASH ? `${REPO}/commit/${COMMIT_HASH}` : undefined;

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
          href: REPO,
          blankTarget: true,
        },
        ...(COMMIT_HASH
          ? [
              {
                key: 'commit',
                title: COMMIT_HASH.slice(0, 7),
                href: commitUrl!,
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
          href: REPO,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
