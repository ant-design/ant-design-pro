import * as React from "react";
export interface ExceptionProps {
  type?: "403" | "404" | "500";
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class Exception extends React.Component<ExceptionProps, any> {}
