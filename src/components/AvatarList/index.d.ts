import React from 'react';
import AvatarItem, { IAvatarItemProps, SizeType } from './AvatarItem';

export interface IAvatarListProps {
  Item?: React.ReactElement<IAvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<IAvatarItemProps> | Array<React.ReactElement<IAvatarItemProps>>;
}
export default class AvatarList extends React.Component<IAvatarListProps, any> {
  public static Item: typeof AvatarItem;
}
