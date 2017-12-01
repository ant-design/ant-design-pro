import * as React from "react";
export interface TagSelectProps {
  onChange?: (value: Array<string>) => void;
  expandable?: boolean;
}
export interface TagSelectOptionProps {
  value: string;
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
