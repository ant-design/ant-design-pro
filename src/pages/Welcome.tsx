import { PageContainer } from '@ant-design/pro-components';
import XMarkdown from '@ant-design/x-markdown';
import { useLocale } from '@umijs/max';
import React, { useEffect, useState } from 'react';

import enUS from '../../docs/welcome.en-US.md?raw';
import zhCN from '../../docs/welcome.zh-CN.md?raw';

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
    rel="noreferrer"
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
  const { locale } = useLocale();
  const [content, setContent] = useState(
    mdContent[locale] || mdContent['zh-CN'],
  );

  useEffect(() => {
    setContent(mdContent[locale] || mdContent['zh-CN']);
  }, [locale]);

  return (
    <PageContainer>
      <div className="flex gap-6">
        <div className="min-w-0 flex-[2]">
          <div className="rounded-lg border border-solid border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#141414]">
            <XMarkdown>{content}</XMarkdown>
          </div>
        </div>
        <div className="flex flex-[1] flex-col gap-6">
          <InfoCard
            index={1}
            href="https://umijs.org/docs/introduce/introduce"
            title={locale === 'zh-CN' ? '了解 umi' : 'Learn umi'}
            desc={
              locale === 'zh-CN'
                ? 'umi 是一个可扩展的企业级前端应用框架，以路由为基础，支持配置式路由和约定式路由。'
                : 'umi is an extensible enterprise-level frontend framework based on routing, supporting both config-based and convention-based routes.'
            }
          />
          <InfoCard
            index={2}
            title={locale === 'zh-CN' ? '了解 Ant Design' : 'Learn Ant Design'}
            href="https://ant.design"
            desc={
              locale === 'zh-CN'
                ? 'antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。'
                : 'antd is a React UI component library based on the Ant Design system, mainly for enterprise-level mid-end products.'
            }
          />
          <InfoCard
            index={3}
            title={
              locale === 'zh-CN'
                ? '了解 Pro Components'
                : 'Learn Pro Components'
            }
            href="https://procomponents.ant.design"
            desc={
              locale === 'zh-CN'
                ? 'ProComponents 是基于 Ant Design 的高抽象模板组件，以一个组件就是一个页面为开发理念。'
                : 'ProComponents provides higher-abstraction template components on top of Ant Design, with one-component-one-page philosophy.'
            }
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
