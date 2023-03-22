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
      display: "flex",
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
      position: "relative",
      top: "4px",
      flex: "1 1 auto",
      marginLeft: "24px",
      color: token.colorTextSecondary,
      lineHeight: "22px",
    },
    contentTitle: {
      marginBottom: "12px",
      color: token.colorTextHeading,
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "28px",
    },
    extraContent: {
      zoom: "1",
      "&::before, &::after": { display: "table", content: "' '" },
      "&::after": {
        clear: "both",
        height: "0",
        fontSize: "0",
        visibility: "hidden",
      },
      float: "right",
      whiteSpace: "nowrap",
    },
    statItem: {
      position: "relative",
      display: "inline-block",
      padding: "0 32px",
      "&::after": {
        position: "absolute",
        top: "8px",
        right: "0",
        width: "1px",
        height: "40px",
        backgroundColor: token.colorSplit,
        content: "''",
      },
      "&:last-child": {
        paddingRight: "0",
        "&::after": {
          display: "none",
        },
      },
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
    members: {},
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
    projectList: {},
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
      width: "33.33%",
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
    [`@media screen and (max-width: ${token.screenXL}) and (min-width: @screen-lg)`]:
      {
        activeCard: { marginBottom: "24px" },
        members: { marginBottom: "0" },
        extraContent: { marginLeft: "-44px" },
        statItem: { padding: "0 16px" },
      },
    [`@media screen and (max-width: ${token.screenLG})`]: {
      activeCard: { marginBottom: "24px" },
      members: { marginBottom: "0" },
      extraContent: { float: "none", marginRight: "0" },
      statItem: {
        padding: "0 16px",
        textAlign: "left",
        "&::after": {
          display: "none",
        },
      },
    },
    [`@media screen and (max-width: ${token.screenMD})`]: {
      extraContent: { marginLeft: "-16px" },
      projectList: {},
      projectGrid: { width: "50%" },
    },
    [`@media screen and (max-width: ${token.screenSM})`]: {
      pageHeaderContent: { display: "block" },
      content: { marginLeft: "0" },
      extraContent: {},
      statItem: { float: "none" },
    },
    [`@media screen and (max-width: ${token.screenXS})`]: {
      projectList: {},
      projectGrid: { width: "100%" },
    },
  };
});

export default useStyles;
