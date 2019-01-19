import * as React from 'react';
import TagSelectOption from './TagSelectOption';

export interface ITagSelectProps {
  onChange?: (value: string[]) => void;
  expandable?: boolean;
  value?: string[] | number[];
  style?: React.CSSProperties;
  hideCheckAll?: boolean;
  expandText?: string | React.ReactNode;
  collapseText?: string | React.ReactNode;
  selectAllText?: string | React.ReactNode;
}

export default class TagSelect extends React.Component<ITagSelectProps, any> {
  public static Option: typeof TagSelectOption;
  private children:
    | React.ReactElement<TagSelectOption>
    | Array<React.ReactElement<TagSelectOption>>;
}
