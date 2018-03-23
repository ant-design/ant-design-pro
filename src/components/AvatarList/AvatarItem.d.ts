import * as React from 'react';
export interface IAvatarItemProps {
  tips: React.ReactNode;
  src: string;
  style?: React.CSSProperties;
}

export default class AvatarItem extends React.Component<IAvatarItemProps, any> {
  constructor(props: IAvatarItemProps);
}
