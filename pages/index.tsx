import {
  ApiOutlined,
  BulbOutlined,
  RocketOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { Alert, Button, Card, Divider, Space, Typography } from 'antd';
import Head from 'next/head';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  // Make application state readable to the AI
  useCopilotReadable({
    description:
      'The current page is the Ant Design Pro Next.js integration demo',
    value: {
      page: 'home',
      features: ['nextjs', 'react19', 'tailwind', 'copilotkit', 'antd'],
    },
  });

  // Add a CopilotKit action
  useCopilotAction({
    name: 'showFeatureDemo',
    description:
      'Demonstrate a specific feature of the Ant Design Pro integration',
    parameters: [
      {
        name: 'feature',
        type: 'string',
        description:
          'The feature to demonstrate (nextjs, tailwind, antd, copilotkit)',
        required: true,
      },
    ],
    handler: async ({ feature }) => {
      alert(`Demonstrating ${feature} integration!`);
    },
  });

  return (
    <>
      <Head>
        <title>Ant Design Pro + Next.js + AI Integration</title>
        <meta
          name="description"
          content="Modern AI-powered admin template with Next.js, React 19, Tailwind CSS, and CopilotKit"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <RocketOutlined className="text-2xl text-blue-600" />
                <Title level={3} className="mb-0">
                  Ant Design Pro + Next.js + AI
                </Title>
              </div>
              <Space>
                <Button type="primary" icon={<BulbOutlined />}>
                  AI Assistant
                </Button>
                <Button icon={<ApiOutlined />}>API Docs</Button>
              </Space>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <Title
              level={1}
              className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              🎉 集成成功！Integration Success!
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              成功将 Next.js + React 19 + Tailwind CSS + CopilotKit 集成到 Ant
              Design Pro 中。 现在您可以享受现代化的 AI 开发体验，同时保持 Ant
              Design 生态系统的强大功能。
            </Paragraph>
          </div>

          {/* Success Alert */}
          <div className="mb-8">
            <Alert
              message="🚀 技术栈集成完成"
              description="Next.js, React 19, Tailwind CSS, CSS-in-JS, Ant Design 5, 和 CopilotKit 已成功集成并可以协同工作"
              type="success"
              showIcon
              className="mb-6"
            />
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card
              title={
                <Space>
                  <ThunderboltOutlined className="text-blue-500" />
                  Next.js + React 19
                </Space>
              }
              className="h-full hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <Text>✅ Next.js 15.1.5 配置完成</Text>
                <br />
                <Text>✅ React 19 实验性功能启用</Text>
                <br />
                <Text>✅ TypeScript 完全支持</Text>
                <br />
                <Text className="text-blue-600">端口: 3001 (与 Umi 并存)</Text>
              </div>
            </Card>

            <Card
              title={
                <Space>
                  <BulbOutlined className="text-purple-500" />
                  Tailwind + Ant Design
                </Space>
              }
              className="h-full hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <Text>✅ Tailwind CSS 3.4 集成</Text>
                <br />
                <Text>✅ 与 Ant Design 样式兼容</Text>
                <br />
                <Text>✅ CSS-in-JS 继续工作</Text>
                <br />
                <div className="flex space-x-2 mt-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                </div>
              </div>
            </Card>

            <Card
              title={
                <Space>
                  <ApiOutlined className="text-green-500" />
                  CopilotKit AI
                </Space>
              }
              className="h-full hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <Text>✅ CopilotKit 1.3.20 集成</Text>
                <br />
                <Text>✅ AI 助手弹窗可用</Text>
                <br />
                <Text>✅ 可读取应用状态</Text>
                <br />
                <Text className="text-green-600">点击右下角试试 AI 助手！</Text>
              </div>
            </Card>
          </div>

          <Divider />

          {/* Usage Instructions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Title level={3} className="mb-4">
              🛠️ 使用说明 Usage Instructions
            </Title>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Title level={4}>开发命令 Development Commands</Title>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div># 启动 Umi.js (原有工作流)</div>
                  <div className="text-blue-600">npm run dev</div>
                  <div># 启动 Next.js (新 AI 工作流)</div>
                  <div className="text-purple-600">npm run dev:next</div>
                </div>
              </div>

              <div>
                <Title level={4}>构建命令 Build Commands</Title>
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm space-y-2">
                  <div># 构建 Umi.js 版本</div>
                  <div className="text-blue-600">npm run build</div>
                  <div># 构建 Next.js 版本</div>
                  <div className="text-purple-600">npm run build:next</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Title level={4}>🎯 AI 功能体验</Title>
              <Paragraph>
                1. 点击右下角的 AI 助手图标
                <br />
                2. 询问关于 Ant Design Pro 开发的问题
                <br />
                3. AI 助手可以帮助您解决 React 组件、Ant Design 使用等问题
              </Paragraph>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-8">
            <Space size="large">
              <Button
                type="primary"
                size="large"
                icon={<RocketOutlined />}
                className="bg-gradient-to-r from-blue-500 to-purple-600 border-0"
              >
                开始使用 Next.js
              </Button>
              <Button
                size="large"
                icon={<BulbOutlined />}
                href="http://localhost:8000"
                target="_blank"
              >
                继续使用 Umi.js
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}
