import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    activitiesList: {
      padding: "0 24px 8px 24px",
    },
    username: {
      color: token.colorText,
    },
    event: {
      fontWeight: "normal",
    },
    pageHeaderContent: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        display: "block",
      },
    },
    avatar: {
      flex: "0 1 72px",
      "& > span": {
        display: "block",
        width: "72px",
        height: "72px",
        borderRadius: "72px",
      },
    },
    content: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        marginLeft: "0",
      },
    },
    contentTitle: {
      marginBottom: "12px",
      color: token.colorTextHeading,
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "28px",
    },
    extraContent: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {},
    },
    statItem: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: { float: "none" },
    },
    "> p:first-child": {
      marginBottom: "4px",
      color: token.colorTextSecondary,
      fontSize: token.fontSize,
      lineHeight: "22px",
    },
    "> p": {
      margin: "0",
      color: token.colorTextHeading,
      fontSize: "30px",
      lineHeight: "38px",
    },
    "> span": {
      color: token.colorTextSecondary,
      fontSize: "20px",
    },
    members: {
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        marginBottom: "0",
      },
    },
    a: {
      display: "inline-block",
      flex: "1 1 0",
      color: token.colorTextSecondary,
      position: "relative",
      maxHeight: token.line * 1.5,
      marginRight: "-1em",
      paddingRight: "1em",
      overflow: "hidden",
      lineHeight: "1.5em",
      textAlign: "justify",
      "&::before": {
        position: "absolute",
        right: "14px",
        bottom: "0",
        padding: "0 1px",
        background: token.bg,
        content: "'...'",
      },
      "&::after": {
        position: "absolute",
        right: "14px",
        width: "1em",
        height: "1em",
        marginTop: "0.2em",
        background: "white",
        content: "''",
      },
      "&:hover": { color: token.colorPrimary },
    },
    member: {
      marginLeft: "12px",
      fontSize: token.fontSize,
      lineHeight: "24px",
      verticalAlign: "top",
    },
    projectList: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {},
    },
    ".ant-card-meta-description": {
      height: "44px",
      overflow: "hidden",
      color: token.colorTextSecondary,
      lineHeight: "22px",
    },
    cardTitle: {
      fontSize: "0",
    },
    projectGrid: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: { width: "100%" },
    },
    projectItemContent: {
      display: "flex",
      height: "20px",
      marginTop: "8px",
      overflow: "hidden",
      fontSize: "12px",
      lineHeight: "1.5em",
      position: "relative",
      maxHeight: token.line * 1.5,
      marginRight: "-1em",
      paddingRight: "1em",
      textAlign: "justify",
      "&::before": {
        position: "absolute",
        right: "14px",
        bottom: "0",
        padding: "0 1px",
        background: token.bg,
        content: "'...'",
      },
      "&::after": {
        position: "absolute",
        right: "14px",
        width: "1em",
        height: "1em",
        marginTop: "0.2em",
        background: "white",
        content: "''",
      },
    },
    datetime: {
      color: token.colorTextDisabled,
    },
    activeCard: {
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        marginBottom: "24px",
      },
    },
  };
});

export default useStyles;
