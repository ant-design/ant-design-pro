import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Bubble, Conversations, Sender, Think, XProvider } from '@ant-design/x';
import type { BubbleListProps } from '@ant-design/x/es/bubble/BubbleList';
import type { BubbleItemType } from '@ant-design/x/es/bubble/interface';
import XMarkdown from '@ant-design/x-markdown';
import { useXChat } from '@ant-design/x-sdk';
import { Avatar, Card } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

import type { ConversationItem, ParsedMessage } from './data';
import { createChatProvider } from './service';
import { useStyles } from './style';

const WELCOME_TEXT = '🤖 你好，有什么可以帮你？';

const TypewriterTitle: React.FC = () => {
  const [index, setIndex] = useState(0);
  const done = index >= WELCOME_TEXT.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i < WELCOME_TEXT.length ? i + 1 : i));
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {WELCOME_TEXT.slice(0, index)}
      {!done && (
        <span style={{ animation: 'chatbot-blink 0.8s step-end infinite' }}>
          |
        </span>
      )}
    </>
  );
};

const parser = (message: { content: string; role: string }): ParsedMessage => {
  const { content, role } = message;
  if (role !== 'assistant') return { role: 'user', content };

  const trimmed = content.trimStart();

  const fullMatch = trimmed.match(/^<think>([\s\S]*?)<\/think>([\s\S]*)$/);
  if (fullMatch) {
    return {
      role: 'assistant',
      thinkContent: fullMatch[1],
      content: fullMatch[2].trimStart(),
    };
  }

  const partialMatch = trimmed.match(/^<think>([\s\S]*)$/);
  if (partialMatch) {
    return { role: 'assistant', thinkContent: partialMatch[1], content: '' };
  }

  return { role: 'assistant', content };
};

const STREAMING_ACTIVE = { hasNextChunk: true, enableAnimation: true };
const STREAMING_IDLE = { hasNextChunk: false, enableAnimation: true };

const roleConfig: BubbleListProps['role'] = {
  user: {
    placement: 'end',
    avatar: <Avatar icon={<UserOutlined />} />,
  },
  ai: {
    placement: 'start',
    avatar: (
      <Avatar
        style={{
          background: 'transparent',
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        🤖
      </Avatar>
    ),
    typing: { effect: 'typing', step: 2, interval: 20 },
    contentRender: (content: string, info: { status?: string }) => {
      if (!content) return null;
      return (
        <XMarkdown
          streaming={
            info?.status === 'updating' ? STREAMING_ACTIVE : STREAMING_IDLE
          }
        >
          {content}
        </XMarkdown>
      );
    },
  },
};

const ChatbotPage: React.FC = () => {
  const { styles } = useStyles();

  const [conversations, setConversations] = useState<ConversationItem[]>([
    { key: 'default', label: '💬 新对话', group: '今天' },
    {
      key: 'preset-1',
      label: '🧩 Ant Design 的 Form 表单如何做联动校验？',
      group: '今天',
    },
    {
      key: 'preset-2',
      label: '📋 ProTable 如何自定义工具栏按钮？',
      group: '今天',
    },
    {
      key: 'preset-3',
      label: '🎨 如何用 antd-style 实现暗色主题切换？',
      group: '昨天',
    },
    {
      key: 'preset-4',
      label: '🗂️ ProLayout 侧边菜单如何动态生成？',
      group: '昨天',
    },
    {
      key: 'preset-5',
      label: '📊 Ant Design Charts 折线图数据格式',
      group: '昨天',
    },
    {
      key: 'preset-6',
      label: '🚀 Ant Design Pro 如何接入后端权限系统？',
      group: '更早',
    },
    {
      key: 'preset-7',
      label: '🔍 ProForm 中 Select 远程搜索怎么实现？',
      group: '更早',
    },
    {
      key: 'preset-8',
      label: '⚙️ Ant Design Token 定制主题最佳实践',
      group: '更早',
    },
  ]);
  const [activeKey, setActiveKey] = useState<string>('default');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = useMemo(() => createChatProvider() as any, []);
  const { onRequest, abort, isRequesting, parsedMessages } = useXChat<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    ParsedMessage
  >({
    provider,
    conversationKey: activeKey,
    parser,
    requestPlaceholder: { role: 'assistant', content: '' },
  });

  const sendMessage = (content: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.key === activeKey && c.label === '新对话'
          ? { ...c, label: content.slice(0, 20) }
          : c,
      ),
    );
    onRequest({ messages: [{ role: 'user', content }] });
  };

  const newChat = () => {
    const key = Date.now().toString();
    setConversations((prev) => [
      { key, label: '新对话', group: '今天' },
      ...prev,
    ]);
    setActiveKey(key);
  };

  const bubbleItems: BubbleItemType[] = parsedMessages.map((msg) => {
    const parsed = msg.message as ParsedMessage;
    const isAI = parsed.role === 'assistant';
    const thinkContent =
      parsed.role === 'assistant' ? parsed.thinkContent : undefined;

    const item: BubbleItemType = {
      key: msg.id,
      role: isAI ? 'ai' : 'user',
      content: parsed.content,
      loading:
        isAI &&
        (msg.status === 'loading' ||
          (msg.status === 'updating' && !parsed.content)),
      status: msg.status,
    };

    if (isAI && thinkContent) {
      item.header = <Think>{thinkContent}</Think>;
    }

    return item;
  });

  const hasMessages = parsedMessages.length > 0;

  return (
    <PageContainer
      ghost
      childrenContentStyle={{
        paddingBlock: 0,
        height: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Card
        variant="borderless"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        styles={{
          body: {
            flex: 1,
            padding: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <XProvider>
          <div className={styles.layout}>
            <div className={styles.sidebar}>
              <Conversations
                items={conversations}
                activeKey={activeKey}
                onActiveChange={setActiveKey}
                groupable
                menu={(conversation) => ({
                  items: [{ key: 'delete', label: '删除', danger: true }],
                  onClick: ({ key }) => {
                    if (key === 'delete') {
                      setConversations((prev) => {
                        const next = prev.filter(
                          (c) => c.key !== conversation.key,
                        );
                        if (activeKey === conversation.key) {
                          setActiveKey(next[0]?.key ?? '');
                        }
                        return next;
                      });
                    }
                  },
                })}
                creation={{ onClick: newChat, label: '新建对话' }}
              />
            </div>

            <div className={styles.main}>
              {hasMessages && (
                <div className={styles.messages}>
                  <Bubble.List
                    items={bubbleItems}
                    role={roleConfig}
                    autoScroll
                    styles={{ root: { maxWidth: 940 } }}
                  />
                </div>
              )}

              <div
                className={hasMessages ? styles.footer : styles.footerCenter}
              >
                {!hasMessages && (
                  <div className={styles.welcomeTitle}>
                    <TypewriterTitle />
                  </div>
                )}
                <Sender
                  loading={isRequesting}
                  onSubmit={sendMessage}
                  onCancel={abort}
                  placeholder="输入消息，按 Enter 发送..."
                  autoSize={{ minRows: 4, maxRows: 8 }}
                  style={{ maxWidth: 940, width: '100%' }}
                />
              </div>
            </div>
          </div>
        </XProvider>
      </Card>
    </PageContainer>
  );
};

export default ChatbotPage;
