import * as React from "react";
export interface AvatarItemProps {
  tips: React.ReactNode;
  src: string;
  style?: React.CSSProperties;
}

export interface AvatarListProps {
  size?: "large" | "small" | "mini" | "default";
  style?: React.CSSProperties;
  children:
    | React.ReactElement<AvatarItem>
    | Array<React.ReactElement<AvatarItem>>;
}

declare class AvatarItem extends React.Component<AvatarItemProps, any> {
  constructor(props: AvatarItemProps);
}

export default class AvatarList extends React.Component<AvatarListProps, any> {
  constructor(props: AvatarListProps);
  static Item: typeof AvatarItem;
}
