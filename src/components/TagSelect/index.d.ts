import React from 'react';
import TagSelectOption, { TagSelectOptionProps } from './TagSelectOption';

export interface TagSelectProps {
  onChange?: (value: string[]) => void;
  expandable?: boolean;
  value?: string[] | number[];
  style?: React.CSSProperties;
  hideCheckAll?: boolean;
  actionsText?: {
    expandText?: React.ReactNode;
    collapseText?: React.ReactNode;
    selectAllText?: React.ReactNode;
  };
  className: string;
  Option: TagSelectOptionProps;
  children: React.ReactElement<TagSelectOption> | Array<React.ReactElement<TagSelectOption>>;
}

export default class TagSelect extends React.Component<TagSelectProps, any> {
  public static Option: typeof TagSelectOption;
  private children:
    | React.ReactElement<TagSelectOption>
    | Array<React.ReactElement<TagSelectOption>>;
}
