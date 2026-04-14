// src/pages/chatbot/index.tsx
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Bubble, Conversations, Sender, Think, XProvider } from '@ant-design/x';
import type { BubbleListProps } from '@ant-design/x/es/bubble/BubbleList';
import type { BubbleItemType } from '@ant-design/x/es/bubble/interface';
import XMarkdown from '@ant-design/x-markdown';
import { useXChat } from '@ant-design/x-sdk';
import { Avatar, Card } from 'antd';
import React, { useMemo, useState } from 'react';
import type { ConversationItem, ParsedMessage } from './data';
import { createChatProvider } from './service';
import { useStyles } from './style';

// ─── Parser ──────────────────────────────────────────────────────────────────
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

// ─── Role config ─────────────────────────────────────────────────────────────
const roleConfig: BubbleListProps['role'] = {
  user: {
    placement: 'end' as const,
    avatar: <Avatar icon={<UserOutlined />} />,
  },
  ai: {
    placement: 'start' as const,
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
    typing: { effect: 'typing' as const, step: 2, interval: 20 },
    contentRender: (content: string, info: { status?: string }) => (
      <XMarkdown
        streaming={{
          hasNextChunk: info?.status === 'updating',
          enableAnimation: true,
        }}
      >
        {content}
      </XMarkdown>
    ),
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
const ChatbotPage: React.FC = () => {
  const { styles } = useStyles();

  const [conversations, setConversations] = useState<ConversationItem[]>([
    { key: 'default', label: '新对话' },
    { key: 'preset-1', label: '如何用 React 实现虚拟列表？' },
    { key: 'preset-2', label: '解释一下 CAP 定理' },
    { key: 'preset-3', label: '帮我写一个 Python 爬虫' },
    { key: 'preset-4', label: 'Tailwind CSS 和 CSS Modules 对比' },
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

  // ─── Handlers ──────────────────────────────────────────────────────────────
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
    setConversations((prev) => [{ key, label: '新对话' }, ...prev]);
    setActiveKey(key);
  };

  // ─── Bubble items ──────────────────────────────────────────────────────────
  const bubbleItems: BubbleItemType[] = parsedMessages.map((msg) => {
    const parsed = msg.message as ParsedMessage;
    const isAI = parsed.role === 'assistant';
    const thinkContent =
      parsed.role === 'assistant' ? parsed.thinkContent : undefined;

    const item: BubbleItemType = {
      key: msg.id,
      role: isAI ? 'ai' : 'user',
      content: parsed.content,
      loading: msg.status === 'loading',
      status: msg.status,
    };

    if (isAI && thinkContent) {
      item.header = <Think>{thinkContent}</Think>;
    }

    return item;
  });

  const hasMessages = parsedMessages.length > 0;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <PageContainer
      ghost
      childrenContentStyle={{
        padding: 0,
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
            {/* Left sidebar */}
            <div className={styles.sidebar}>
              <Conversations
                items={conversations}
                activeKey={activeKey}
                onActiveChange={setActiveKey}
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

            {/* Right main area */}
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
                    你好，有什么可以帮你？
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
