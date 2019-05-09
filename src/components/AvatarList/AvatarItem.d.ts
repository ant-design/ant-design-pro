import React from 'react';

export declare type SizeType = number | 'small' | 'default' | 'large';

export interface IAvatarItemProps {
  tips: React.ReactNode;
  src: string;
  size?: SizeType;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default class AvatarItem extends React.Component<IAvatarItemProps, any> {
  constructor(props: IAvatarItemProps);
}
