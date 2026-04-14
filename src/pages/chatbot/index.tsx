// src/pages/chatbot/index.tsx
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Think,
  Welcome,
  XProvider,
} from '@ant-design/x';
import type {
  BubbleItemType,
  RoleType,
} from '@ant-design/x/es/bubble/interface';
import { XMarkdown } from '@ant-design/x-markdown';
import { useXChat } from '@ant-design/x-sdk';
import { Avatar } from 'antd';
import React, { useMemo, useState } from 'react';
import type { ConversationItem, ParsedMessage } from './data';
import { createChatProvider } from './service';
import { useStyles } from './style';

// ─── Parser ──────────────────────────────────────────────────────────────────
// Handles three streaming states:
//   1. Full <think>...</think> block has arrived
//   2. Streaming in progress — </think> not yet received (partialMatch)
//   3. No think tag at all
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
const roleConfig: RoleType = {
  user: {
    placement: 'end' as const,
    avatar: <Avatar icon={<UserOutlined />} />,
  },
  ai: {
    placement: 'start' as const,
    avatar: <Avatar src="/logo.svg" />,
    typing: { effect: 'typing' as const, step: 2, interval: 20 },
  },
};

// ─── Quick prompts ────────────────────────────────────────────────────────────
const promptItems = [
  { key: 'code', label: '写一段代码', description: '帮我写一个 React 组件' },
  {
    key: 'explain',
    label: '解释概念',
    description: '解释一下什么是向量数据库',
  },
  { key: 'translate', label: '翻译文档', description: '把这段文字翻译成英文' },
];

// ─── Component ───────────────────────────────────────────────────────────────
const ChatbotPage: React.FC = () => {
  const { styles } = useStyles();

  // Conversation list state
  const [conversations, setConversations] = useState<ConversationItem[]>([
    { key: 'default', label: '新对话' },
  ]);
  const [activeKey, setActiveKey] = useState<string>('default');

  // Chat hook — keyed per conversation
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
    };

    // Markdown rendering for AI messages
    if (isAI) {
      item.contentRender = (content: string) => (
        <XMarkdown
          content={content}
          streaming={
            msg.status === 'updating'
              ? { hasNextChunk: true, tail: true }
              : undefined
          }
        />
      );
    }

    // Think-chain header
    if (isAI && thinkContent) {
      item.header = <Think>{thinkContent}</Think>;
    }

    return item;
  });

  const hasMessages = parsedMessages.length > 0;

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <PageContainer ghost>
      <XProvider>
        <div className={styles.layout}>
          {/* Left sidebar — conversation list */}
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
            {!hasMessages ? (
              // Empty state — welcome + quick prompts
              <div className={styles.welcome}>
                <Welcome
                  icon="/logo.svg"
                  title="你好，有什么可以帮你？"
                  description="我是 AI 助手，可以帮助你写代码、分析数据、翻译文档等"
                />
                <Prompts
                  items={promptItems}
                  onItemClick={(info) =>
                    sendMessage(info.data.description as string)
                  }
                  style={{ marginTop: 24 }}
                />
              </div>
            ) : (
              // Message list
              <div className={styles.messages}>
                <Bubble.List items={bubbleItems} role={roleConfig} autoScroll />
              </div>
            )}

            {/* Input area */}
            <div className={styles.footer}>
              <Sender
                value=""
                loading={isRequesting}
                onSubmit={sendMessage}
                onCancel={abort}
                placeholder="输入消息，按 Enter 发送..."
              />
            </div>
          </div>
        </div>
      </XProvider>
    </PageContainer>
  );
};

export default ChatbotPage;
