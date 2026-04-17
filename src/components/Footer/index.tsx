import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const REPO_URL = 'https://github.com/ant-design/ant-design-pro';

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
