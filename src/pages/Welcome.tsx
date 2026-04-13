import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Card hoverable style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 8,
            background: '#1677ff',
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {index}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Title level={4} style={{ marginBottom: 8, marginTop: 0 }}>
            {title}
          </Title>
          <Paragraph
            type="secondary"
            ellipsis={{ rows: 2 }}
            style={{ marginBottom: 0 }}
          >
            {desc}
          </Paragraph>
        </div>
      </div>
    </Card>
  </a>
);

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const isDark = initialState?.settings?.navTheme === 'realDark';

  return (
    <PageContainer>
      <Row justify="center">
        <Col xs={24} lg={20}>
          <Card>
            {/* 标题区域 */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <Title level={2} style={{ marginBottom: 16 }}>
                欢迎使用 Ant Design Pro
              </Title>
              <Paragraph
                type="secondary"
                style={{ fontSize: 16, maxWidth: 600, margin: '0 auto' }}
              >
                Ant Design Pro 是一个整合了 umi，Ant Design 和 ProComponents
                的脚手架方案。致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。
              </Paragraph>
            </div>

            {/* 卡片区域 */}
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <InfoCard
                  index={1}
                  href="https://umijs.org/docs/introduce/introduce"
                  title="了解 umi"
                  desc="umi 是一个可扩展的企业级前端应用框架,umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。"
                />
              </Col>
              <Col xs={24} md={8}>
                <InfoCard
                  index={2}
                  title="了解 ant design"
                  href="https://ant.design"
                  desc="antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。"
                />
              </Col>
              <Col xs={24} md={8}>
                <InfoCard
                  index={3}
                  title="了解 Pro Components"
                  href="https://procomponents.ant.design"
                  desc="ProComponents 是一个基于 Ant Design 做了更高抽象的模板组件，以 一个组件就是一个页面为开发理念，为中后台开发带来更好的体验。"
                />
              </Col>
            </Row>

            {/* 底部链接 */}
            <div
              style={{
                marginTop: 40,
                paddingTop: 24,
                borderTop: `1px solid ${isDark ? '#303030' : '#f0f0f0'}`,
                textAlign: 'center',
              }}
            >
              <Text type="secondary">
                更多文档请访问：{' '}
                <a
                  href="https://pro.ant.design"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pro 官方文档
                </a>
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Welcome;
