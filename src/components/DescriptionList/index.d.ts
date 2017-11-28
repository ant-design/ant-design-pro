import React from "react";
export interface DescriptionListProps {
  layout?: "horizontal" | "vertical";
  col?: number;
  title: React.ReactNode;
  gutter?: number;
  size?: "large" | "small";
}

declare class Description extends React.Component<
  {
    term: React.ReactNode;
  },
  any
> {}

export default class DescriptionList extends React.Component<
  DescriptionListProps,
  any
> {
  static Description: typeof Description;
}
