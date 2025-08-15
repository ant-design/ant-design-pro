import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Ant Design Pro with Next.js, React 19, Tailwind CSS, and AI Integration"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Preload Alibaba Sans font */}
        <link
          rel="preload"
          href="https://gw.alipayobjects.com/os/lib/antd/4.20.6/dist/antd.min.css"
          as="style"
        />

        {/* Meta tags for AI/modern features */}
        <meta
          name="keywords"
          content="ant design, react 19, next.js, tailwind css, copilot, ai"
        />
        <meta name="author" content="Ant Design Pro Team" />
      </Head>
      <body>
        {/* Next.js root container */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
