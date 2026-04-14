// src/pages/chatbot/data.d.ts

export interface ConversationItem {
  /** Unique key — also used as useXChat conversationKey */
  key: string;
  /** Conversation title: first 20 chars of first user message */
  label: string;
}

export type ParsedMessage =
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string; thinkContent?: string };
