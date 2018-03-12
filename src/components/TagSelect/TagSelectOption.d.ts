import * as React from 'react';

export interface ITagSelectOptionProps {
  value: string | number;
  style?: React.CSSProperties;
}

export default class TagSelectOption extends React.Component<
  ITagSelectOptionProps,
  any
> {}
