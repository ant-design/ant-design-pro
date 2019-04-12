import React from 'react';
import AvatarItem, { AvatarItemProps, SizeType } from './AvatarItem';

export interface AvatarListProps {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | Array<React.ReactElement<AvatarItemProps>>;
}
export default class AvatarList extends React.Component<AvatarListProps, any> {
  public static Item: typeof AvatarItem;
}
