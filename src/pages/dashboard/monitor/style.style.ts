import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    mapChart: {
      [`@media screen and (max-width: ${token.screenLG}px)`]: {
        height: "auto",
      },
    },
    img: {
      display: "inline-block",
      maxWidth: "100%",
      maxHeight: "437px",
    },
  };
});

export default useStyles;
