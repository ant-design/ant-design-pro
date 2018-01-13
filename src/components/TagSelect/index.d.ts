import * as React from 'react';
export interface TagSelectProps {
  onChange?: (value: Array<string>) => void;
  expandable?: boolean;
  style?: React.CSSProperties;
}
export interface TagSelectOptionProps {
  value: string;
  style?: React.CSSProperties;
}

export class TagSelectOption extends React.Component<
  TagSelectOptionProps,
  any
> {}

export default class TagSelect extends React.Component<TagSelectProps, any> {
  static Option: typeof TagSelectOption;
  children:
    | React.ReactElement<TagSelectOption>
    | Array<React.ReactElement<TagSelectOption>>;
}
