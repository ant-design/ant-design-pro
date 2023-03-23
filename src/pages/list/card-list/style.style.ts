import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    cardList: {},
    card: {},
    ".ant-card-meta-title": {
      marginBottom: "12px",
      "& > a": {
        display: "inline-block",
        maxWidth: "100%",
        color: token.colorTextHeading,
      },
    },
    ".ant-card-body:hover": {},
    ".ant-card-meta-title > a": {
      color: token.colorPrimary,
    },
    item: {
      height: "64px",
    },
    ".ant-list .ant-list-item-content-single": {
      maxWidth: "100%",
    },
    extraImg: {
      [`@media screen and (max-width: ${token.screenMD}px)`]: {
        display: "none",
      },
    },
    img: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        marginRight: "4px",
      },
    },
    newButton: {
      width: "100%",
      height: "201px",
      color: token.colorTextSecondary,
      backgroundColor: token.colorBgContainer,
      borderColor: token.colorBorder,
    },
    cardAvatar: {
      width: "48px",
      height: "48px",
      borderRadius: "48px",
    },
    cardDescription: {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      wordBreak: "break-all",
    },
    pageHeaderContent: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        paddingBottom: "30px",
      },
    },
    contentLink: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        position: "absolute",
        bottom: "-4px",
        left: "0",
        width: "1000px",
      },
    },
    a: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        marginRight: "16px",
      },
    },
  };
});

export default useStyles;
