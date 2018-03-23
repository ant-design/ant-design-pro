import * as React from "react";
export interface IGlobalFooterProps {
  links?: Array<{
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }>;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
}

export default class GlobalFooter extends React.Component<
  IGlobalFooterProps,
  any
> {}
