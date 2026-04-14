// src/pages/chatbot/service.ts
import { OpenAIChatProvider, XRequest } from '@ant-design/x-sdk';

export const CHAT_API_URL =
  'https://api.x.ant.design/api/big_model_glm-4.5-flash';

/**
 * Factory — call once per component mount (wrap in useMemo).
 * OpenAIChatProvider handles SSE parsing and history accumulation internally.
 */
export const createChatProvider = () =>
  new OpenAIChatProvider({
    request: XRequest(CHAT_API_URL, {
      manual: true,
      params: { model: 'glm-4.5-flash', stream: true },
    }),
  });
