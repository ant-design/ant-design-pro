import React from 'react';
export interface IGlobalFooterProps {
  links?: Array<{
    key?: string;
    title: React.ReactNode;
    href: string;
    blankTarget?: boolean;
  }>;
  copyright?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default class GlobalFooter extends React.Component<IGlobalFooterProps, any> {}
