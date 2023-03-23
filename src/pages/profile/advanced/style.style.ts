import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    main: {},
    ".ant-descriptions-row > td": {
      paddingBottom: "8px",
    },
    ".ant-page-header-heading-extra": {
      flexDirection: "column",
    },
    headerList: {
      marginBottom: "4px",
    },
    stepDescription: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: { left: "8px" },
    },
    "> div": {
      marginTop: "8px",
      marginBottom: "4px",
    },
    pageHeader: {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {},
    },
    ".ant-page-header-heading-extra > * + *": {
      marginLeft: "8px",
    },
    moreInfo: {
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
    },
    ".ant-pro-page-header-wrap-row": {
      [`@media screen and (max-width: ${token.screenSM}px)`]: {
        flexDirection: "column",
      },
    },
  };
});

export default useStyles;
