import { PageContainer } from '@ant-design/pro-components';
import XMarkdown from '@ant-design/x-markdown';
import '@ant-design/x-markdown/es/XMarkdown/index.css';
import enUS from '@root/docs/welcome.en-US';
import zhCN from '@root/docs/welcome.zh-CN';
import { getLocale, useIntl } from '@umijs/max';
import { createStyles } from 'antd-style';
import React from 'react';

const useStyles = createStyles(({ token, css }) => ({
  markdown: css`
    .x-markdown {
      --text-color: ${token.colorText};
      --font-size: ${token.fontSize}px;

      h1 {
        font-size: ${token.fontSizeHeading1}px;
        font-weight: ${token.fontWeightStrong};
        margin: ${token.marginLG}px 0 ${token.marginMD}px;
        line-height: ${token.lineHeightHeading1};
      }

      h2 {
        font-size: ${token.fontSizeHeading2}px;
        font-weight: ${token.fontWeightStrong};
        margin: ${token.marginXL}px 0 ${token.marginSM}px;
        line-height: ${token.lineHeightHeading2};
        padding-bottom: ${token.paddingXXS}px;
        border-bottom: 1px solid ${token.colorBorderSecondary};
      }

      h3 {
        font-size: ${token.fontSizeHeading3}px;
        font-weight: ${token.fontWeightStrong};
        margin: ${token.marginLG}px 0 ${token.marginXS}px;
        line-height: ${token.lineHeightHeading3};
      }

      h4 {
        font-size: ${token.fontSizeHeading4}px;
        font-weight: ${token.fontWeightStrong};
        margin: ${token.marginMD}px 0 ${token.marginXS}px;
      }

      h5,
      h6 {
        font-size: ${token.fontSizeHeading5}px;
        font-weight: ${token.fontWeightStrong};
        margin: ${token.marginMD}px 0 ${token.marginXS}px;
      }

      a {
        color: ${token.colorLink};
        text-decoration: none;

        &:hover {
          color: ${token.colorLinkHover};
        }
      }

      code {
        background: ${token.colorFillQuaternary};
        border: 1px solid ${token.colorBorderSecondary};
        font-family: ${token.fontFamilyCode};
      }

      pre {
        background: ${token.colorFillQuaternary};
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;
        padding: ${token.paddingMD}px;
        overflow-x: auto;

        code {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          font-size: ${token.fontSizeSM}px;
          line-height: 1.6;
        }
      }

      blockquote {
        margin: ${token.marginMD}px 0;
        padding: ${token.paddingSM}px ${token.paddingMD}px;
        border-left: 4px solid ${token.colorPrimary};
        background: ${token.colorFillQuaternary};
        border-radius: 0 ${token.borderRadiusSM}px ${token.borderRadiusSM}px 0;
        color: ${token.colorTextSecondary};

        > p:first-child {
          margin-top: 0;
        }

        > p:last-child {
          margin-bottom: 0;
        }
      }

      table:not(pre) {
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;
        overflow: hidden;

        th {
          background: ${token.colorFillQuaternary};
          border-bottom: 2px solid ${token.colorBorderSecondary};
        }

        th,
        td {
          border: 1px solid ${token.colorBorderSecondary};
        }

        tr:hover td {
          background: ${token.colorFillQuaternary};
        }
      }

      hr {
        border: none;
        border-top: 1px solid ${token.colorBorderSecondary};
      }

      strong {
        font-weight: ${token.fontWeightStrong};
      }

      img {
        border-radius: ${token.borderRadiusLG}px;
      }
    }
  `,
}));

interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={title}
    className="block h-full rounded-lg border border-solid border-gray-200 p-5 transition-shadow hover:shadow-md dark:border-gray-700"
  >
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#1677ff] text-2xl font-bold text-white">
        {index}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="mb-2 mt-0 text-base font-semibold">{title}</h4>
        <p className="mb-0 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>
    </div>
  </a>
);

const mdContent: Record<string, string> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

const Welcome: React.FC = () => {
  const intl = useIntl();
  const locale = getLocale();
  const content = mdContent[locale] || mdContent['zh-CN'];
  const { styles } = useStyles();

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className={`min-w-0 md:flex-[2] ${styles.markdown}`}>
          <div className="rounded-lg border border-solid border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#141414]">
            <XMarkdown>{content}</XMarkdown>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <InfoCard
            index={1}
            href="https://umijs.org/docs/introduce/introduce"
            title={intl.formatMessage({
              id: 'pages.welcome.infoCard.umi.title',
              defaultMessage: 'Learn umi',
            })}
            desc={intl.formatMessage({
              id: 'pages.welcome.infoCard.umi.desc',
              defaultMessage:
                'umi is an extensible enterprise-level frontend framework based on routing, supporting both config-based and convention-based routes.',
            })}
          />
          <InfoCard
            index={2}
            href="https://ant.design"
            title={intl.formatMessage({
              id: 'pages.welcome.infoCard.antd.title',
              defaultMessage: 'Learn Ant Design',
            })}
            desc={intl.formatMessage({
              id: 'pages.welcome.infoCard.antd.desc',
              defaultMessage:
                'antd is a React UI component library based on the Ant Design system, mainly for enterprise-level mid-end products.',
            })}
          />
          <InfoCard
            index={3}
            href="https://procomponents.ant.design"
            title={intl.formatMessage({
              id: 'pages.welcome.infoCard.procomponents.title',
              defaultMessage: 'Learn Pro Components',
            })}
            desc={intl.formatMessage({
              id: 'pages.welcome.infoCard.procomponents.desc',
              defaultMessage:
                'ProComponents provides higher-abstraction template components on top of Ant Design, with one-component-one-page philosophy.',
            })}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
