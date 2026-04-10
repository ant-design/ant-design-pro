import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { token } = theme.useToken();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block p-6 rounded-2xl bg-white dark:bg-white/5 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 dark:border-white/10"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold"
          style={{
            background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} 100%)`,
          }}
        >
          {index}
        </div>
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        {desc}
      </p>
      <div
        className="mt-4 text-sm font-medium"
        style={{ color: token.colorPrimary }}
      >
        了解更多 →
      </div>
    </a>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  const isDark = initialState?.settings?.navTheme === 'realDark';

  return (
    <PageContainer>
      <Card
        className="rounded-2xl overflow-hidden"
        styles={{
          body: {
            background: isDark
              ? 'linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
              : 'linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 lg:p-10">
          {/* 左侧：欢迎和介绍 */}
          <div className="flex-1 lg:w-2/3">
            <h1
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ color: token.colorTextHeading }}
            >
              欢迎使用 Ant Design Pro
            </h1>
            <p className="text-base leading-7 text-gray-500 dark:text-gray-400 max-w-2xl">
              Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
              的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
            </p>
          </div>

          {/* 右侧：信息卡片 */}
          <div className="flex-1 lg:w-1/3 flex flex-col gap-4">
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
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
