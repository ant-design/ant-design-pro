import React, { useState } from 'react';
import { Layout, Table, Input, Select, DatePicker, Button, Card, Space, Tag, Avatar, Modal, Form, message, Typography } from 'antd';
import { SearchOutlined, ExportOutlined, DeleteOutlined, EditOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import './index.less';

const { Text } = Typography;

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟数据
const mockSessions = [
  { id: '1', userId: 'user_001', title: '技术支持会话', messageCount: 25, updateTime: '2024-01-15 14:30:00', status: 'active' },
  { id: '2', userId: 'user_002', title: '产品咨询', messageCount: 12, updateTime: '2024-01-15 10:15:00', status: 'active' },
  { id: '3', userId: 'user_003', title: '投诉建议', messageCount: 8, updateTime: '2024-01-14 16:45:00', status: 'deleted' },
];

const mockMessages = {
  '1': [
    { id: 'msg_001', sessionId: '1', role: 'user', sequence: 1, contentPreview: '您好，我遇到了一个技术问题...', type: 'text', createTime: '2024-01-15 14:30:00' },
    { id: 'msg_002', sessionId: '1', role: 'admin', sequence: 2, contentPreview: '请详细描述您的问题...', type: 'text', createTime: '2024-01-15 14:31:00' },
    { id: 'msg_003', sessionId: '1', role: 'user', sequence: 3, contentPreview: '这是问题的截图', type: 'image', createTime: '2024-01-15 14:32:00' },
  ],
  '2': [
    { id: 'msg_004', sessionId: '2', role: 'user', sequence: 1, contentPreview: '我想了解贵公司的新产品...', type: 'text', createTime: '2024-01-15 10:15:00' },
  ],
};

const mockContents = {
  'msg_001': [{ id: 'cnt_001', messageId: 'msg_001', sequence: 1, content: '您好，我遇到了一个技术问题，我的应用程序无法启动。', type: 'text' }],
  'msg_002': [{ id: 'cnt_002', messageId: 'msg_002', sequence: 1, content: '请详细描述您的问题，包括错误信息和操作步骤。', type: 'text' }],
  'msg_003': [
    { id: 'cnt_003', messageId: 'msg_003', sequence: 1, content: 'screenshot_001.png', type: 'image' },
    { id: 'cnt_004', messageId: 'msg_003', sequence: 2, content: '这是应用程序启动失败时的截图。', type: 'text' },
  ],
};

const MessagesPage: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState<any>(null);

  // 搜索条件状态
  const [searchType, setSearchType] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);

  // 左侧会话列表列配置
  const sessionColumns = [
    { title: '会话 ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: '用户 ID', dataIndex: 'userId', key: 'userId', width: 100 },
    { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: '消息数', dataIndex: 'messageCount', key: 'messageCount', width: 80 },
    { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width: 150 },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      width: 80,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>
          {status === 'active' ? '有效' : '已删除'}
        </Tag>
      )
    },
    { 
      title: '操作', 
      key: 'actions', 
      width: 120,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button size="small" icon={<EyeOutlined />} onClick={() => handleViewSession(record.id)}>
            查看
          </Button>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditSession(record.id)}>
            编辑
          </Button>
          <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteSession(record.id)}>
            删除
          </Button>
        </Space>
      )
    },
  ];

  // 中间消息列表列配置
  const messageColumns = [
    { title: '消息 ID', dataIndex: 'id', key: 'id', width: 120 },
    { 
      title: '角色', 
      dataIndex: 'role', 
      key: 'role', 
      width: 80,
      render: (role: string) => (
        <Tag color={role === 'user' ? 'blue' : 'orange'}>
          {role === 'user' ? '用户' : '管理员'}
        </Tag>
      )
    },
    { title: '序号', dataIndex: 'sequence', key: 'sequence', width: 60 },
    { 
      title: '内容预览', 
      dataIndex: 'contentPreview', 
      key: 'contentPreview',
      render: (preview: string, record: any) => (
        <div>
          {record.type === 'image' ? (
            <Avatar src={preview} size={40} />
          ) : (
            <Text ellipsis>{preview}</Text>
          )}
        </div>
      )
    },
    { 
      title: '类型', 
      dataIndex: 'type', 
      key: 'type', 
      width: 80,
      render: (type: string) => (
        <Tag color={type === 'text' ? 'purple' : 'cyan'}>
          {type === 'text' ? '文本' : '图片'}
        </Tag>
      )
    },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 150 },
    { 
      title: '操作', 
      key: 'actions', 
      width: 100,
      render: (_: any, record: any) => (
        <Space size="small">
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEditMessage(record.id)}>
            编辑
          </Button>
          <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteMessage(record.id)}>
            删除
          </Button>
        </Space>
      )
    },
  ];

  // 处理会话选择
  const handleSessionSelect = (record: any) => {
    setSelectedSession(record.id);
    setSelectedMessage(null);
  };

  // 处理消息选择
  const handleMessageSelect = (record: any) => {
    setSelectedMessage(record.id);
  };

  // 查看会话
  const handleViewSession = (sessionId: string) => {
    setSelectedSession(sessionId);
    setSelectedMessage(null);
  };

  // 编辑会话
  const handleEditSession = (sessionId: string) => {
    message.info('编辑会话功能待实现');
  };

  // 删除会话
  const handleDeleteSession = (sessionId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此会话吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('会话删除成功');
      },
    });
  };

  // 编辑消息
  const handleEditMessage = (messageId: string) => {
    message.info('编辑消息功能待实现');
  };

  // 删除消息
  const handleDeleteMessage = (messageId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此消息吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('消息删除成功');
      },
    });
  };

  // 显示内容编辑弹窗
  const showContentModal = (content?: any) => {
    setCurrentContent(content);
    if (content) {
      form.setFieldsValue(content);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  // 关闭内容编辑弹窗
  const handleContentModalCancel = () => {
    setIsModalVisible(false);
    setCurrentContent(null);
  };

  // 保存内容
  const handleContentSave = () => {
    form.validateFields().then(values => {
      if (currentContent) {
        message.success('内容更新成功');
      } else {
        message.success('内容添加成功');
      }
      setIsModalVisible(false);
      setCurrentContent(null);
    }).catch(errorInfo => {
      message.error('表单验证失败');
    });
  };

  // 删除内容
  const handleContentDelete = (contentId: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此内容吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('内容删除成功');
      },
    });
  };

  // 重置搜索条件
  const handleReset = () => {
    setSearchType('');
    setSearchValue('');
    setStatusFilter('');
    setRoleFilter('');
    setDateRange([null, null]);
    message.success('搜索条件已重置');
  };

  // 处理搜索
  const handleSearch = () => {
    if (!searchType || !searchValue) {
      message.warning('请选择搜索类型并输入搜索内容');
      return;
    }
    
    // 这里可以添加实际的搜索逻辑
    message.success(`已按${searchType}搜索: ${searchValue}`);
  };

  // 导出数据
  const handleExport = () => {
    message.info('数据导出功能待实现');
  };

  // 批量删除
  const handleBatchDelete = () => {
    Modal.confirm({
      title: '确认批量删除',
      content: '确定要删除选中的项目吗？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success('批量删除成功');
      },
    });
  };

  return (
    <Layout style={{ height: '100vh' }}>
      {/* 顶部搜索和操作栏 */}
      <Header style={{ padding: '0 24px', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <Space wrap size="middle" style={{ width: '100%' }}>
          {/* 多维度搜索区域 */}
          <Space size="middle">
            <Select 
              placeholder="搜索类型" 
              value={searchType} 
              onChange={setSearchType} 
              style={{ width: 150 }} 
            >
              <Option value="sessionTitle">会话标题</Option>
              <Option value="messageContent">消息内容</Option>
              <Option value="userId">用户 ID</Option>
            </Select>
            
            <Input 
              placeholder={searchType ? `请输入${searchType === 'sessionTitle' ? '会话标题' : searchType === 'messageContent' ? '消息内容' : '用户 ID'}` : '请先选择搜索类型'} 
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)} 
              style={{ width: 250 }} 
              allowClear 
            />
            
            <Button 
              type="primary" 
              icon={<SearchOutlined />} 
              onClick={handleSearch} 
              disabled={!searchType || !searchValue} 
            >
              搜索
            </Button>
          </Space>

          {/* 多条件筛选区域 */}
          <Space size="middle">
            <Select 
              placeholder="状态" 
              value={statusFilter} 
              onChange={setStatusFilter} 
              style={{ width: 120 }} 
              allowClear 
            >
              <Option value="active">有效</Option>
              <Option value="deleted">已删除</Option>
            </Select>

            <Select 
              placeholder="角色" 
              value={roleFilter} 
              onChange={setRoleFilter} 
              style={{ width: 120 }} 
              allowClear 
            >
              <Option value="user">用户</Option>
              <Option value="admin">管理员</Option>
            </Select>

            <RangePicker 
              placeholder={['开始日期', '结束日期']} 
              value={dateRange} 
              onChange={(dates) => setDateRange(dates as [Dayjs | null, Dayjs | null])} 
              style={{ width: 300 }} 
            />

            <Button onClick={handleReset}>重置</Button>
          </Space>

          {/* 操作按钮 */}
          <Space size="middle" style={{ marginLeft: 'auto' }}>
            <Button icon={<ExportOutlined />} onClick={handleExport}>导出</Button>
            <Button danger icon={<DeleteOutlined />} onClick={handleBatchDelete}>批量删除</Button>
          </Space>
        </Space>
      </Header>

      <Layout>
        {/* 左侧会话列表 */}
        <Sider width={320} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <Card title="会话列表" style={{ height: '100%', border: 'none' }}>
            <Table
              columns={sessionColumns}
              dataSource={mockSessions}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              onRow={(record) => ({
                onClick: () => handleSessionSelect(record),
                style: {
                  backgroundColor: selectedSession === record.id ? '#e6f7ff' : '',
                },
              })}
            />
          </Card>
        </Sider>

        {/* 中间消息列表 */}
        <Sider width={480} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
          <Card title="消息列表" style={{ height: '100%', border: 'none' }}>
            {selectedSession ? (
              <Table
                columns={messageColumns}
                dataSource={(mockMessages as any)[selectedSession] || []}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                onRow={(record) => ({
                  onClick: () => handleMessageSelect(record),
                  style: {
                    backgroundColor: selectedMessage === record.id ? '#e6f7ff' : '',
                  },
                })}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>
                请选择一个会话
              </div>
            )}
          </Card>
        </Sider>

        {/* 右侧内容详情 */}
        <Content style={{ background: '#fff', padding: '24px' }}>
          <Card 
            title="内容详情"
            extra={
              selectedMessage && (
                <Button icon={<PlusOutlined />} onClick={() => showContentModal()}>
                  添加内容
                </Button>
              )
            }
          >
            {selectedMessage ? (
              <div>
                {(mockContents as any)[selectedMessage]?.map((content: any) => (
                  <Card 
                    key={content.id} 
                    size="small" 
                    style={{ marginBottom: '16px' }} 
                    extra={
                      <Space size="small">
                        <Button size="small" icon={<EditOutlined />} onClick={() => showContentModal(content)}>
                          编辑
                        </Button>
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleContentDelete(content.id)}>
                          删除
                        </Button>
                      </Space>
                    }
                  >
                    <div style={{ marginBottom: '8px' }}>
                      <Tag color="blue">序号: {content.sequence}</Tag>
                      <Tag color={content.type === 'text' ? 'purple' : 'cyan'} style={{ marginLeft: '8px' }}>
                        {content.type === 'text' ? '文本' : '图片'}
                      </Tag>
                    </div>
                    <div>
                      {content.type === 'image' ? (
                        <Avatar src={content.content} size={80} />
                      ) : (
                        <p>{content.content}</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0', color: '#999' }}>
                {selectedSession ? '请选择一条消息' : '请先选择一个会话'}
              </div>
            )}
          </Card>
        </Content>
      </Layout>

      {/* 内容编辑弹窗 */}
      <Modal
        title={currentContent ? '编辑内容' : '添加内容'}
        visible={isModalVisible}
        onCancel={handleContentModalCancel}
        footer={[
          <Button key="back" onClick={handleContentModalCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleContentSave}>
            保存
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="sequence"
            label="序号"
            rules={[{ required: true, message: '请输入序号' }]}
          >
            <Input type="number" placeholder="请输入序号" />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select placeholder="请选择类型">
              <Option value="text">文本</Option>
              <Option value="image">图片</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            {form.getFieldValue('type') === 'image' ? (
              <Input placeholder="请输入图片路径" />
            ) : (
              <Input.TextArea placeholder="请输入文本内容" rows={4} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MessagesPage;