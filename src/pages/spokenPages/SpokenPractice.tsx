import {
  CloseOutlined,
  MicrophoneOutlined,
  SendOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Input, Layout, Modal, Progress, Space } from 'antd';
import React, { useState } from 'react';
import './SpokenPractice.less';

const { Header, Content } = Layout;
const { TextArea } = Input;

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface Score {
  accuracy: number;
  grammar: number;
  fluency: number;
}

const SpokenPractice: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '你好！我是你的AI口语练习伙伴。今天想练习什么话题呢？',
      sender: 'ai',
      timestamp: '10:00',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<Score>({
    accuracy: 85,
    grammar: 90,
    fluency: 80,
  });

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputValue,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // 模拟AI回复
      setTimeout(() => {
        const aiMessage: Message = {
          id: messages.length + 2,
          content: '你的回答很好！让我给你一些反馈...',
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages([...messages, newMessage, aiMessage]);
      }, 1000);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // 模拟录音处理
    const newMessage: Message = {
      id: messages.length + 1,
      content: '（语音消息）',
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([...messages, newMessage]);

    // 模拟AI回复和评分
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content: '你的发音很清晰！让我给你详细的评分反馈。',
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage, aiMessage]);
      // 模拟评分
      setScore({
        accuracy: Math.floor(Math.random() * 20) + 80,
        grammar: Math.floor(Math.random() * 20) + 80,
        fluency: Math.floor(Math.random() * 20) + 80,
      });
    }, 1500);
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  return (
    <Layout className="spoken-practice-layout">
      <Header className="spoken-practice-header">
        <div className="header-left">
          <Avatar
            size={40}
            icon={<MicrophoneOutlined />}
            className="app-icon"
          />
        </div>
        <div className="header-center">
          <h1 className="app-title">AI口语练习</h1>
        </div>
        <div className="header-right">
          <Space size="middle">
            <Button
              icon={<SettingOutlined />}
              ghost
              className="header-button"
            />
            <Avatar size={40} icon={<UserOutlined />} className="user-avatar" />
          </Space>
        </div>
      </Header>
      <Content className="spoken-practice-content">
        <div className="conversation-area">
          {messages.map((message) => (
            <div key={message.id} className={`message-item ${message.sender}`}>
              <div className="message-bubble">
                <p className="message-content">{message.content}</p>
                <p className="message-timestamp">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="input-area">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入内容..."
            rows={3}
            className="text-input"
            onPressEnter={(e) => {
              if (e.ctrlKey || e.metaKey) handleSendMessage();
            }}
          />
          <Space size="middle" className="input-buttons">
            <Button
              icon={<MicrophoneOutlined />}
              type="primary"
              onClick={handleStartRecording}
              className="voice-button"
            />
            <Button
              icon={<SendOutlined />}
              type="primary"
              onClick={handleSendMessage}
              className="send-button"
            />
          </Space>
        </div>
        <div className="score-area">
          <h2 className="score-title">口语评分反馈</h2>
          <div className="score-details">
            <div className="score-item">
              <span className="score-label">发音准确度</span>
              <Progress
                percent={score.accuracy}
                strokeColor="#52c41a"
                className="score-progress"
              />
              <span className="score-value">{score.accuracy}分</span>
            </div>
            <div className="score-item">
              <span className="score-label">语法正确性</span>
              <Progress
                percent={score.grammar}
                strokeColor="#1890ff"
                className="score-progress"
              />
              <span className="score-value">{score.grammar}分</span>
            </div>
            <div className="score-item">
              <span className="score-label">流利度</span>
              <Progress
                percent={score.fluency}
                strokeColor="#faad14"
                className="score-progress"
              />
              <span className="score-value">{score.fluency}分</span>
            </div>
          </div>
        </div>
      </Content>
      <Modal
        visible={isRecording}
        footer={null}
        closable={false}
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        className="recording-modal"
      >
        <div className="recording-content">
          <div className="mic-icon-container">
            <MicrophoneOutlined className="mic-icon" />
          </div>
          <h2 className="recording-title">正在录音</h2>
          <div className="recording-buttons">
            <Button
              icon={<CloseOutlined />}
              onClick={handleCancelRecording}
              className="cancel-button"
            >
              取消
            </Button>
            <Button
              type="primary"
              onClick={handleStopRecording}
              className="finish-button"
            >
              完成录音
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default SpokenPractice;
