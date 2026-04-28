import { PageContainer } from '@ant-design/pro-components';
import XMarkdown from '@ant-design/x-markdown';
import '@ant-design/x-markdown/es/XMarkdown/index.css';
import enUS from '@root/docs/welcome.en-US';
import zhCN from '@root/docs/welcome.zh-CN';
import { getLocale, useIntl } from '@umijs/max';
import { Card } from 'antd';
import hljs from 'highlight.js';
import type { marked } from 'marked';
import React from 'react';

import 'highlight.js/styles/github-gist.css';
import './Welcome.css';
import './Welcome-dark.css';

interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
    <Card hoverable size="small">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1677ff] text-base font-bold text-white">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 mt-0 text-sm font-semibold">{title}</h4>
          <p className="mb-0 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        </div>
      </div>
    </Card>
  </a>
);

const mdContent: Record<string, string> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

const Heading: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & { tag?: string }
> = ({ tag: Tag = 'h1', children, ...rest }) => {
  const text = String(children);
  const id = text
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
  return (
    // @ts-expect-error dynamic tag
    <Tag id={id} className="heading-anchor" {...rest}>
      <a href={`#${id}`} className="anchor-link" tabIndex={-1}>
        #
      </a>
      {children}
    </Tag>
  );
};

const mdComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading tag="h1" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading tag="h2" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading tag="h3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Heading tag="h4" {...props} />
  ),
};

const mdConfig: marked.MarkedOptions = {
  highlight(code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
};

const Welcome: React.FC = () => {
  const intl = useIntl();
  const locale = getLocale();
  const content = mdContent[locale] || mdContent['zh-CN'];

  return (
    <PageContainer>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="min-w-0 md:flex-[2] welcome-markdown">
          <Card>
            <XMarkdown components={mdComponents} config={mdConfig}>
              {content}
            </XMarkdown>
          </Card>
        </div>
        <div className="flex flex-1 flex-col gap-4">
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
