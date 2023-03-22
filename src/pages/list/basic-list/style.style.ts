import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    standardList: {},
    ".ant-card-head": {
      borderBottom: "none",
    },
    ".ant-card-head-title": {
      padding: "24px 0",
      lineHeight: "32px",
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
      position: "relative",
      textAlign: "center",
      "& > span": {
        display: "inline-block",
        marginBottom: "4px",
        color: token.colorTextSecondary,
        fontSize: token.fontSize,
        lineHeight: "22px",
      },
      "& > p": {
        margin: "0",
        color: token.colorTextHeading,
        fontSize: "24px",
        lineHeight: "32px",
      },
      "& > em": {
        position: "absolute",
        top: "0",
        right: "0",
        width: "1px",
        height: "56px",
        backgroundColor: token.colorSplit,
      },
    },
    listContent: {
      fontSize: "0",
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
      width: "272px",
      marginLeft: "16px",
    },
    [`@media screen and (max-width: ${token.screenXS})`]: {
      standardList: {},
      ".ant-list-item-content": {
        display: "block",
        flex: "none",
        width: "100%",
      },
      ".ant-list-item-action": { marginLeft: "0" },
      listContent: {
        marginLeft: "0",
        "& > div": {
          marginLeft: "0",
        },
      },
      listCard: {},
      ".ant-card-head-title": { overflow: "visible" },
    },
    [`@media screen and (max-width: ${token.screenSM})`]: {
      standardList: {},
      extraContentSearch: { width: "100%", marginLeft: "0" },
      headerInfo: {
        marginBottom: "16px",
        "& > em": {
          display: "none",
        },
      },
    },
    [`@media screen and (max-width: ${token.screenMD})`]: {
      standardList: {},
      listContent: {
        "& > div": {
          display: "block",
        },
        "& > div:last-child": {
          top: "0",
          width: "100%",
        },
      },
      listCard: {},
      ".ant-radio-group": { display: "block", marginBottom: "8px" },
    },
    [`@media screen and (max-width: ${token.screenLG}) and (min-width: @screen-md)`]:
      {
        standardList: {},
        listContent: {
          "& > div": {
            display: "block",
          },
          "& > div:last-child": {
            top: "0",
            width: "100%",
          },
        },
      },
    [`@media screen and (max-width: ${token.screenXL})`]: {
      standardList: {},
      listContent: {
        "& > div": {
          marginLeft: "24px",
        },
        "& > div:last-child": {
          top: "0",
        },
      },
    },
    "@media screen and (max-width: 1400px)": {
      standardList: {},
      listContent: {
        textAlign: "right",
        "& > div:last-child": {
          top: "0",
        },
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
