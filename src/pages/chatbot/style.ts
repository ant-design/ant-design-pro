// src/pages/chatbot/style.ts
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  // Full-height container — relies on PageContainer ghost mode
  layout: css`
    display: flex;
    height: 100%;
    gap: 0;

    // PageContainer ghost mode still adds padding in children container
    .ant-pro-page-container-children-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
    }
  `,

  sidebar: css`
    width: 240px;
    border-right: 1px solid ${token.colorBorderSecondary};
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,

  main: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
  `,

  welcome: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${token.paddingLG}px;
  `,

  messages: css`
    flex: 1;
    overflow-y: auto;
    padding: ${token.paddingMD}px;
  `,

  footer: css`
    padding: ${token.paddingMD}px;
    border-top: 1px solid ${token.colorBorderSecondary};
  `,
}));
