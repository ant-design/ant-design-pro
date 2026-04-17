import { PageContainer } from '@ant-design/pro-components';
import type React from 'react';

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

const Welcome: React.FC = () => (
  <PageContainer>
    <div className="rounded-lg border border-solid border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#141414]">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-2xl font-semibold">欢迎使用 Ant Design Pro</h2>
        <p className="mx-auto max-w-[600px] text-base text-gray-500 dark:text-gray-400">
          Ant Design Pro 是一个整合了 umi，Ant Design 和
          ProComponents的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InfoCard
          index={1}
          href="https://umijs.org/docs/introduce/introduce"
          title="了解 umi"
          desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
        />
        <InfoCard
          index={2}
          title="了解 ant design"
          href="https://ant.design"
          desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
        />
        <InfoCard
          index={3}
          title="了解 Pro Components"
          href="https://procomponents.ant.design"
          desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
        />
      </div>

      <div className="mt-10 border-t border-gray-100 pt-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        更多文档请访问：{' '}
        <a
          href="https://pro.ant.design"
          target="_blank"
          rel="noreferrer"
          className="text-[#1677ff] hover:text-[#4096ff]"
        >
          Pro 官方文档
        </a>
      </div>
    </div>
  </PageContainer>
);

export default Welcome;
