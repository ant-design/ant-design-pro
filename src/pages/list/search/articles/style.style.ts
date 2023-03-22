import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    "a.listItemMetaTitle": {
      color: token.colorTextHeading,
    },
    listItemExtra: {
      width: "272px",
      height: "1px",
    },
    selfTrigger: {
      marginLeft: "12px",
    },
    [`@media screen and (max-width: ${token.screenXS})`]: {
      selfTrigger: { display: "block", marginLeft: "0" },
    },
    [`@media screen and (max-width: ${token.screenMD})`]: {
      selfTrigger: { display: "block", marginLeft: "0" },
    },
    [`@media screen and (max-width: ${token.screenLG})`]: {
      listItemExtra: { width: "0", height: "1px" },
    },
  };
});

export default useStyles;
