import React from "react";
export interface GlobalFooterProps {
  links: Array<{
    title: string | React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }>;
  copyright: React.ReactNode;
}

export default class GlobalFooter extends React.Component<
  GlobalFooterProps,
  any
> {}
