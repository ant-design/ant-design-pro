import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => {
  return {
    standardFormRow: {
      display: "flex",
      width: "100%",
      marginBottom: "16px",
      paddingBottom: "16px",
      borderBottom: "1px dashed @border-color-split",
    },
    ".ant-form-item, .ant-legacy-form-item": {
      "&:last-child": { display: "block", marginRight: "0" },
    },
    ".ant-form-item-label, .ant-legacy-form-item-label": {
      float: "left",
    },
    label: {
      flex: "0 0 auto",
      marginRight: "24px",
      color: token.colorTextHeading,
      fontSize: token.fontSize,
      textAlign: "right",
      "& > span": {
        display: "inline-block",
        height: "32px",
        lineHeight: "32px",
        "&::after": {
          content: "'：'",
        },
      },
    },
    ".ant-form-item-label, .ant-legacy-form-item-label, .ant-form-item-control, .ant-legacy-form-item-control":
      {
        padding: "0",
        lineHeight: "32px",
      },
    content: {
      flex: "1 1 0",
    },
    standardFormRowLast: {
      marginBottom: "0",
      paddingBottom: "0",
      border: "none",
    },
    standardFormRowBlock: {},
    ".ant-form-item, .ant-legacy-form-item, div.ant-form-item-control-wrapper, div.ant-legacy-form-item-control-wrapper":
      {
        display: "block",
      },
    standardFormRowGrid: {},
  };
});

export default useStyles;
