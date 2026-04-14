// src/pages/chatbot/data.d.ts

export interface ConversationItem {
  key: string;
  label: string;
  group?: string;
  isDraft?: boolean;
}

export type ParsedMessage =
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string; thinkContent?: string };
