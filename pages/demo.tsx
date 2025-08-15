import {
  BarChartOutlined,
  RiseOutlined,
  SettingOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';

const { Title, Text } = Typography;
const { Option } = Select;

// Sample data for demonstration
const tableData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <a className="text-blue-600 hover:text-blue-800">{text}</a>
    ),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag} className="rounded-full">
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
];

export default function Demo() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Make demo data readable to AI
  useCopilotReadable({
    description:
      'Demo page showing Ant Design components with Tailwind CSS styling',
    value: {
      page: 'demo',
      components: ['Table', 'Form', 'Card', 'Statistics'],
      users: tableData.length,
      framework: 'Next.js + Ant Design + Tailwind',
    },
  });

  // Add CopilotKit action for form submission
  useCopilotAction({
    name: 'submitDemoForm',
    description: 'Submit the demo form with user data',
    parameters: [
      {
        name: 'name',
        type: 'string',
        description: 'User name',
        required: true,
      },
      {
        name: 'email',
        type: 'string',
        description: 'User email',
        required: true,
      },
    ],
    handler: async ({ name, email }) => {
      form.setFieldsValue({ name, email });
      alert(`AI helped fill form: ${name} (${email})`);
    },
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form values:', values);
    setLoading(false);
    alert('Form submitted successfully!');
  };

  return (
    <>
      <Head>
        <title>Demo - Ant Design Pro + Next.js Integration</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Title level={2} className="mb-0 flex items-center gap-3">
              <BarChartOutlined className="text-blue-600" />
              演示页面 Demo Page
            </Title>
            <Text className="text-gray-600">
              展示 Ant Design + Tailwind CSS + Next.js + AI 的完美集成
            </Text>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <Statistic
                  title="总用户"
                  value={1128}
                  prefix={<TeamOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#1890ff' }}
                />
                <div className="mt-2">
                  <Progress percent={75} size="small" strokeColor="#1890ff" />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <Statistic
                  title="销售额"
                  value={93}
                  suffix="万"
                  prefix={<ShoppingOutlined className="text-green-500" />}
                  valueStyle={{ color: '#52c41a' }}
                />
                <div className="mt-2">
                  <Progress percent={85} size="small" strokeColor="#52c41a" />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <Statistic
                  title="增长率"
                  value={15.2}
                  suffix="%"
                  prefix={<RiseOutlined className="text-orange-500" />}
                  valueStyle={{ color: '#fa8c16' }}
                />
                <div className="mt-2">
                  <Progress percent={60} size="small" strokeColor="#fa8c16" />
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <Statistic
                  title="活跃度"
                  value={68.5}
                  suffix="%"
                  prefix={<UserOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#722ed1' }}
                />
                <div className="mt-2">
                  <Progress percent={68} size="small" strokeColor="#722ed1" />
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {/* Form Card */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <SettingOutlined />
                    <span>用户表单 User Form</span>
                  </Space>
                }
                className="h-full"
              >
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  className="space-y-4"
                >
                  <Form.Item
                    label="用户名 Name"
                    name="name"
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input
                      placeholder="请输入用户名"
                      prefix={<UserOutlined className="text-gray-400" />}
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    label="邮箱 Email"
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效邮箱' },
                    ]}
                  >
                    <Input placeholder="请输入邮箱" className="rounded-lg" />
                  </Form.Item>

                  <Form.Item label="角色 Role" name="role">
                    <Select placeholder="选择角色" className="w-full">
                      <Option value="admin">管理员</Option>
                      <Option value="user">用户</Option>
                      <Option value="guest">访客</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item label="生日 Birthday" name="birthday">
                    <DatePicker className="w-full rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    label="启用通知"
                    name="notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>

                  <Form.Item>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        提交 Submit
                      </Button>
                      <Button
                        onClick={() => form.resetFields()}
                        className="rounded-lg"
                      >
                        重置 Reset
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>

                {/* AI助手提示 */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Text className="text-blue-700">
                    💡 <strong>AI 助手提示:</strong> 您可以询问 AI
                    助手帮您填写表单， 比如说"帮我填写一个示例用户的信息"
                  </Text>
                </div>
              </Card>
            </Col>

            {/* Table Card */}
            <Col xs={24} lg={12}>
              <Card
                title={
                  <Space>
                    <TeamOutlined />
                    <span>用户列表 User List</span>
                  </Space>
                }
                className="h-full"
              >
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  size="middle"
                  className="rounded-lg overflow-hidden"
                />

                {/* Tailwind CSS 样式展示 */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <Title level={5} className="text-purple-700 mb-2">
                    🎨 Tailwind CSS 样式展示
                  </Title>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Responsive Design
                    </div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Utility Classes
                    </div>
                    <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Modern Gradients
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded"></div>
                    <div className="h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded"></div>
                    <div className="h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded"></div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Technology Integration Card */}
          <Card className="mt-8">
            <Title level={3} className="text-center mb-6">
              🚀 技术集成展示 Technology Integration
            </Title>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Avatar size={64} className="bg-blue-500 mb-4">
                    N
                  </Avatar>
                  <Title level={4}>Next.js 15</Title>
                  <Text>React 19 支持、服务端渲染、优化构建</Text>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <Avatar size={64} className="bg-purple-500 mb-4">
                    T
                  </Avatar>
                  <Title level={4}>Tailwind CSS</Title>
                  <Text>实用类优先、响应式设计、现代样式</Text>
                </div>
              </Col>

              <Col xs={24} md={8}>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <Avatar size={64} className="bg-green-500 mb-4">
                    AI
                  </Avatar>
                  <Title level={4}>CopilotKit</Title>
                  <Text>AI 助手集成、智能对话、自动化操作</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
}
