import { type NextRequest, NextResponse } from 'next/server';

// Simple mock CopilotKit API endpoint
// In a real application, this would connect to OpenAI or other AI services
export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    // Mock AI response - in production, integrate with OpenAI/Claude/etc
    await req.json();

    const mockResponses = [
      '我是 Ant Design Pro 的 AI 助手。我可以帮助您：\n\n1. 解答 React 组件开发问题\n2. 提供 Ant Design 使用建议\n3. 协助 Next.js 和 Tailwind CSS 集成\n4. 分享最佳实践',
      '您可以使用以下 Ant Design 组件来构建现代化的管理界面：Button、Table、Form、Card、Layout 等。需要具体的使用示例吗？',
      'Next.js 与 Umi.js 可以并存使用。您可以：\n- 使用 npm run dev 启动 Umi.js\n- 使用 npm run dev:next 启动 Next.js\n- 根据项目需要选择合适的框架',
      'Tailwind CSS 已配置为与 Ant Design 兼容。您可以同时使用 Tailwind 的实用类和 Ant Design 的组件系统。',
    ];

    const response =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return NextResponse.json({
      choices: [
        {
          message: {
            content: response,
            role: 'assistant',
          },
        },
      ],
    });
  } catch (error) {
    console.error('CopilotKit API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
