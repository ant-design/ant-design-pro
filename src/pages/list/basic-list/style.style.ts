import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    standardList: {
      "@media screen and (max-width: 1400px)": {},
    },
    ".ant-card-head": {
      borderBottom: "none",
    },
    ".ant-card-head-title": {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        overflow: "visible",
      },
    },
    ".ant-card-extra": {
      padding: "24px 0",
    },
    ".ant-list-pagination": {
      marginTop: "24px",
      textAlign: "right",
    },
    ".ant-avatar-lg": {
      width: "48px",
      height: "48px",
      lineHeight: "48px",
    },
    headerInfo: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        marginBottom: "16px",
        "& > em": {
          display: "none",
        },
      },
    },
    listContent: {
      "@media screen and (max-width: 1400px)": {
        textAlign: "right",
        "& > div:last-child": {
          top: "0",
        },
      },
    },
    listContentItem: {
      display: "inline-block",
      marginLeft: "40px",
      color: token.colorTextSecondary,
      fontSize: token.fontSize,
      verticalAlign: "middle",
    },
    "> span": {
      lineHeight: "20px",
    },
    "> p": {
      marginTop: "4px",
      marginBottom: "0",
      lineHeight: "22px",
    },
    extraContentSearch: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        width: "100%",
        marginLeft: "0",
      },
    },
    ".ant-list-item-content": {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        display: "block",
        flex: "none",
        width: "100%",
      },
    },
    ".ant-list-item-action": {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        marginLeft: "0",
      },
    },
    listCard: {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {},
    },
    ".ant-radio-group": {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        display: "block",
        marginBottom: "8px",
      },
    },
    standardListForm: {},
    ".ant-form-item": {
      marginBottom: "12px",
      "&:last-child": { marginBottom: "32px", paddingTop: "4px" },
    },
    formResult: {
      width: "100%",
    },
    "[class^='title']": {
      marginBottom: "8px",
    },
  };
});

export default useStyles;
