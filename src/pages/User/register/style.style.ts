import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    main: {
      width: "368px",
      margin: "0 auto",
    },
    h3: {
      marginBottom: "20px",
      fontSize: "16px",
    },
    password: {
      marginBottom: "24px",
    },
    ".ant-form-item-explain": {
      display: "none",
    },
    getCaptcha: {
      display: "block",
      width: "100%",
    },
    submit: {
      width: "50%",
    },
    login: {
      float: "right",
      lineHeight: token.controlHeight,
    },
    success: {
      color: token.colorSuccess,
    },
    warning: {
      color: token.colorWarning,
    },
    error: {
      color: token.colorError,
    },
    ".progress-pass > .progress": {},
    ".ant-progress-bg": {
      backgroundColor: token.colorWarning,
    },
  };
});

export default useStyles;
