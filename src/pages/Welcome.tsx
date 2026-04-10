import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, theme } from 'antd';
import React from 'react';

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
  isDark?: boolean;
}> = ({ title, href, index, desc, isDark }) => {
  const { token } = theme.useToken();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: isDark
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}`,
        boxShadow: isDark
          ? '0 4px 24px rgba(0,0,0,0.3)'
          : '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* 悬停时的光效 */}
      <div
        className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-0 transition-all duration-500 group-hover:animate-shine group-hover:opacity-10"
        style={{ display: isDark ? 'none' : 'block' }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} 100%)`,
            boxShadow: `0 8px 20px ${token.colorPrimary}40`,
          }}
        >
          {index}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors"
            style={{ color: token.colorText }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{ color: token.colorTextSecondary }}
          >
            {desc}
          </p>
        </div>
      </div>

      <div
        className="mt-4 text-sm font-medium flex items-center gap-1 transition-colors group-hover:gap-2"
        style={{ color: token.colorPrimary }}
      >
        了解更多
        <span className="transition-transform">→</span>
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
              ? 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
            padding: '48px 0',
          },
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <h1
              className="text-5xl font-bold mb-6"
              style={{
                background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              欢迎使用 Ant Design Pro
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ color: token.colorTextSecondary }}
            >
              Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
              的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
            </p>
          </div>

          {/* 卡片区域 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="了解 umi"
              desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
              isDark={isDark}
            />
            <InfoCard
              index={2}
              title="了解 ant design"
              href="https://ant.design"
              desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
              isDark={isDark}
            />
            <InfoCard
              index={3}
              title="了解 Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
              isDark={isDark}
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
