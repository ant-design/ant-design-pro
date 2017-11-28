
import React from 'react';
export interface AvatarItemProps {
    tips: string | React.ReactNode,
    src: string
}

export interface AvatarListProps {
    size?: "large" | "small" | "mini" | "default"
}


declare class AvatarItem extends React.Component<AvatarItemProps, any> {
    constructor(props: AvatarItemProps);
}

export default class AvatarList extends React.Component<AvatarListProps, any> {
    constructor(props: AvatarListProps);
    static Item: typeof AvatarItem;
}
