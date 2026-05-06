import { GithubOutlined } from '@ant-design/icons';
import packageJson from '@root/package.json';
import { Divider } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

const getRepoUrl = () => {
  if (!packageJson.repository)
    return 'https://github.com/ant-design/ant-design-pro';
  const repo =
    typeof packageJson.repository === 'string'
      ? packageJson.repository
      : (packageJson.repository as { url: string }).url;
  const match = repo.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
  if (!match) return 'https://github.com/ant-design/ant-design-pro';
  return `https://github.com/${match[1]}/${match[2]}`;
};

const REPO_URL = getRepoUrl();
const COMMIT_HASH = process.env.COMMIT_HASH || '';

const useStyles = createStyles(({ token, css }) => ({
  footer: css`
    padding: 16px 24px;
    text-align: center;
    color: ${token.colorTextDescription};
    font-size: ${token.fontSizeSM}px;
    line-height: ${token.lineHeight};
    background: transparent;
  `,
  copyright: css`
    margin-bottom: 6px;
  `,
  link: css`
    color: ${token.colorTextDescription};
    text-decoration: none;
    transition: color ${token.motionDurationMid};

    &:hover {
      color: ${token.colorText};
    }
  `,
  meta: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px 12px;
    font-family: ${token.fontFamilyCode};
    font-size: ${token.fontSizeSM - 1}px;
  `,
  group: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
  `,
  label: css`
    color: ${token.colorTextQuaternary};
  `,
  divider: css`
    display: inline-block;
    vertical-align: middle;
  `,
}));

const Footer: React.FC = () => {
  const { styles } = useStyles();
  const year = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>Ant Design Pro &copy; {year}</div>
      <div className={styles.meta}>
        <span className={styles.group}>
          <span className={styles.label}>ver</span>
          <a
            className={styles.link}
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {__APP_VERSION__}
          </a>
          {COMMIT_HASH && (
            <a
              className={styles.link}
              href={`${REPO_URL}/commit/${COMMIT_HASH}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {COMMIT_HASH.slice(0, 7)}
            </a>
          )}
        </span>
        <Divider orientation="vertical" className={styles.divider} />
        <span className={styles.group}>
          <span className={styles.label}>Umi</span>
          <a
            className={styles.link}
            href="https://umijs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {__UMI_VERSION__}
          </a>
        </span>
        <Divider orientation="vertical" className={styles.divider} />
        <span className={styles.group}>
          <span className={styles.label}>Utoo</span>
          <a
            className={styles.link}
            href="https://utoo.land"
            target="_blank"
            rel="noopener noreferrer"
          >
            {__UTOO_VERSION__}
          </a>
        </span>
        <Divider orientation="vertical" className={styles.divider} />
        <a
          className={styles.link}
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined style={{ marginRight: 4 }} />
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
