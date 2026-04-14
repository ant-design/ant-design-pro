// src/pages/chatbot/style.ts
import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => ({
  pageContainer: css`
    height: 100%;

    .ant-pro-page-container-children-container {
      height: 100%;
      padding-bottom: 0;
    }
  `,

  card: css`
    height: 100%;
    display: flex;
    flex-direction: column;

    .ant-card-body {
      flex: 1;
      padding: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
  `,

  layout: css`
    display: flex;
    height: 100%;
    gap: 0;
    overflow: hidden;
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
