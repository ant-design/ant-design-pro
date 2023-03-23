import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    listContent: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {},
    },
    description: {
      maxWidth: "720px",
      lineHeight: "22px",
    },
    extra: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
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
