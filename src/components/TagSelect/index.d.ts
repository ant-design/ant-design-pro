import * as React from 'react';
import TagSelectOption from './TagSelectOption';

export interface ITagSelectProps {
  onChange?: (value: string[]) => void;
  expandable?: boolean;
  value?: string[] | number[];
  style?: React.CSSProperties;
  hideCheckAll?: boolean;
  actionsText?: { expandText?: string; collapseText?: string; selectAllText?: string };
}

export default class TagSelect extends React.Component<ITagSelectProps, any> {
  public static Option: typeof TagSelectOption;
  private children:
    | React.ReactElement<TagSelectOption>
    | Array<React.ReactElement<TagSelectOption>>;
}
