import * as React from 'react';
import AvatarItem from './AvatarItem';

export interface IAvatarListProps {
  size?: 'large' | 'small' | 'mini' | 'default';
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItem> | Array<React.ReactElement<AvatarItem>>;
}

export default class AvatarList extends React.Component<IAvatarListProps, any> {
  public static Item: typeof AvatarItem;
}
