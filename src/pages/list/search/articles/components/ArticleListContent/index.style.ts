import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    listContent: {},
    description: {
      maxWidth: "720px",
      lineHeight: "22px",
    },
    extra: {
      marginTop: "16px",
      color: token.colorTextSecondary,
      lineHeight: "22px",
      "& > em": {
        marginLeft: "16px",
        color: token.colorTextDisabled,
        fontStyle: "normal",
      },
    },
    [`@media screen and (max-width: ${token.screenXS})`]: {
      listContent: {},
      extra: {
        "& > em": {
          display: "block",
          marginTop: "8px",
          marginLeft: "0",
        },
      },
    },
  };
});

export default useStyles;
