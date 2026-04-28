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
  React.HTMLAttributes<HTMLHeadingElement> & { tag?: string; domNode?: unknown }
> = ({
  tag: Tag = 'h1',
  children,
  className,
  classname,
  class: htmlClass,
  ...rest
}) => {
  // Merge all possible class sources from XMarkdown Renderer
  const allClasses = [className, classname, htmlClass]
    .filter(Boolean)
    .join(' ');
  // Extract text content from children for id generation
  const textContent = React.Children.toArray(children)
    .map((child) => (typeof child === 'string' ? child : ''))
    .join('');
  const id = textContent
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
  const mergedClass = `heading-anchor ${allClasses}`.trim();
  return (
    // @ts-expect-error dynamic tag
    <Tag id={id} className={mergedClass}>
      <a href={`#${id}`} className="anchor-link">
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

const mdConfig = {
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const langString = (lang || '').trim();
      let highlighted: string;
      if (langString && hljs.getLanguage(langString)) {
        highlighted = hljs.highlight(text.replace(/\n$/, ''), {
          language: langString,
        }).value;
      } else {
        highlighted = hljs.highlightAuto(text.replace(/\n$/, '')).value;
      }
      const classAttr = langString
        ? ` class="hljs language-${langString}"`
        : ' class="hljs"';
      return `<pre><code${classAttr}>${highlighted}\n</code></pre>\n`;
    },
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
