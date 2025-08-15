import '../styles/globals.css';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import type { AppProps } from 'next/app';
import 'dayjs/locale/zh-cn';
import '@ant-design/v5-patch-for-react-19';

// Import Tailwind CSS styles
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          fontFamily: 'AlibabaSans, sans-serif',
          colorPrimary: '#1890ff',
        },
        cssVar: true,
      }}
    >
      <CopilotKit runtimeUrl="/api/copilotkit">
        <div className="min-h-screen bg-gray-50">
          {/* Next.js root container */}
          <Component {...pageProps} />
          <CopilotPopup
            instructions="You are an AI assistant helping with Ant Design Pro development. You can help with React components, Ant Design usage, and general web development questions."
            labels={{
              title: 'Ant Design Pro AI Assistant',
              initial:
                "Hello! I'm here to help you with Ant Design Pro development. How can I assist you today?",
            }}
          />
        </div>
      </CopilotKit>
    </ConfigProvider>
  );
}
