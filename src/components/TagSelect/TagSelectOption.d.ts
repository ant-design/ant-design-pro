import React from 'react';

export interface ITagSelectOptionProps {
  value?: string | number;
  style?: React.CSSProperties;
  checked?: boolean;
  onChange?: (value: string | number, state: boolean) => void;
}

export default class TagSelectOption extends React.Component<ITagSelectOptionProps, any> {
  public static isTagSelectOption?: boolean;
}
