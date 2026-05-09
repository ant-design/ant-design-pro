import { PageContainer } from '@ant-design/pro-components';
import XMarkdown from '@ant-design/x-markdown';
import '@ant-design/x-markdown/es/XMarkdown/index.css';
import enUS from '@root/docs/cheatsheet.en-US.md';
import zhCN from '@root/docs/cheatsheet.zh-CN.md';
import { getLocale, useIntl, useModel } from '@umijs/max';
import { Card } from 'antd';
import hljs from 'highlight.js';
import React from 'react';

import 'highlight.js/styles/github.css';
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
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1677ff] text-base font-bold text-white">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 mt-0 text-sm font-semibold">{title}</h4>
          <p className="mb-0 line-clamp-2 text-xs text-zinc-500">{desc}</p>
        </div>
      </div>
    </Card>
  </a>
);

const mdContent: Record<string, string> = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// XMarkdown Renderer passes class names via non-standard props
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: string;
  domNode?: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classname?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class?: any;
}

const Heading: React.FC<HeadingProps> = ({
  tag: Tag = 'h1',
  children,
  className,
  classname,
  class: htmlClass,
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
    .replace(/[^\w\s一-鿿-]/g, '')
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
  h1: (props: HeadingProps) => <Heading tag="h1" {...props} />,
  h2: (props: HeadingProps) => <Heading tag="h2" {...props} />,
  h3: (props: HeadingProps) => <Heading tag="h3" {...props} />,
  h4: (props: HeadingProps) => <Heading tag="h4" {...props} />,
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

const infoCards = [
  {
    index: 1,
    href: 'https://umijs.org/docs/introduce/introduce',
    titleId: 'pages.welcome.infoCard.umi.title',
    titleDefault: 'Learn umi',
    descId: 'pages.welcome.infoCard.umi.desc',
    descDefault:
      'umi is an extensible enterprise-level frontend framework based on routing, supporting both config-based and convention-based routes.',
  },
  {
    index: 2,
    href: 'https://ant.design',
    titleId: 'pages.welcome.infoCard.antd.title',
    titleDefault: 'Learn Ant Design',
    descId: 'pages.welcome.infoCard.antd.desc',
    descDefault:
      'antd is a React UI component library based on the Ant Design system, mainly for enterprise-level mid-end products.',
  },
  {
    index: 3,
    href: 'https://procomponents.ant.design',
    titleId: 'pages.welcome.infoCard.procomponents.title',
    titleDefault: 'Learn Pro Components',
    descId: 'pages.welcome.infoCard.procomponents.desc',
    descDefault:
      'ProComponents provides higher-abstraction template components on top of Ant Design, with one-component-one-page philosophy.',
  },
] as const;

const Welcome: React.FC = () => {
  const intl = useIntl();
  const locale = getLocale();
  const normalizedLocale = locale.toLowerCase();
  const content =
    mdContent[locale] ??
    (normalizedLocale.startsWith('zh')
      ? mdContent['zh-CN']
      : mdContent['en-US']);
  const { initialState } = useModel('@@initialState');
  const isDark = initialState?.settings?.navTheme === 'realDark';

  return (
    <PageContainer
      title={
        <>
          {intl.formatMessage(
            {
              id: 'pages.welcome.celebrationTitle',
              defaultMessage: '欢迎使用 Ant Design Pro {v6}',
            },
            {
              v6: (
                <span key="v6" className="welcome-gradient-title">
                  V6
                </span>
              ),
            },
          )}
          🎉
        </>
      }
    >
      <div
        data-theme={isDark ? 'dark' : 'light'}
        className="flex flex-col gap-6 md:flex-row"
      >
        <div className="min-w-0 md:flex-[2] welcome-markdown">
          <Card>
            <XMarkdown components={mdComponents} config={mdConfig}>
              {content}
            </XMarkdown>
          </Card>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {infoCards.map((card) => (
            <InfoCard
              key={card.href}
              index={card.index}
              href={card.href}
              title={intl.formatMessage({
                id: card.titleId,
                defaultMessage: card.titleDefault,
              })}
              desc={intl.formatMessage({
                id: card.descId,
                defaultMessage: card.descDefault,
              })}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
