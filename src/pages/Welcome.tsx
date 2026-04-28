import { PageContainer } from '@ant-design/pro-components';
import XMarkdown from '@ant-design/x-markdown';
import enUS from '@root/docs/welcome.en-US';
import zhCN from '@root/docs/welcome.zh-CN';
import { getLocale, useIntl } from '@umijs/max';
import React from 'react';

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

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="min-w-0 md:flex-[2]">
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
