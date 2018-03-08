import * as React from 'react';
import TagSelectOption from './TagSelectOption';

export interface ITagSelectProps {
  onChange?: (value: string[]) => void;
  expandable?: boolean;
  value?: string[] | number[];
  style?: React.CSSProperties;
}

export default class TagSelect extends React.Component<ITagSelectProps, any> {
  public static Option: typeof TagSelectOption;
  private children:
    | React.ReactElement<TagSelectOption>
    | Array<React.ReactElement<TagSelectOption>>;
}
