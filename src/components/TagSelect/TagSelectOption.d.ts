import React from 'react';

export interface TagSelectOptionProps {
  value: string | number;
  style?: React.CSSProperties;
  checked: boolean;
  onChange: (value: string | number, state: boolean) => void;
}

interface TagSelectOptionType extends React.FC<TagSelectOptionProps> {
  isTagSelectOption?: boolean;
}

export default class TagSelectOption extends React.Component<TagSelectOptionType, any> {}
