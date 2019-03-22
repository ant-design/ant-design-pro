import React from 'react';
import AvatarItem, { AvatarItemProps, SizeType } from './AvatarItem';

export interface IAvatarListProps {
  size?: 'large' | 'small' | 'mini' | 'default';
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItem> | Array<React.ReactElement<AvatarItem>>;
}

interface AvatarListProps {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | Array<React.ReactElement<AvatarItemProps>>;
}
export default class AvatarList extends React.Component<AvatarListProps, any> {}
