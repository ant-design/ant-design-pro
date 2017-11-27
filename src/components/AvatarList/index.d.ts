
import React from 'react';
export interface AvatarListProps {
    tips: string | React.ReactNode,
    src: string
}

export interface AvatarItemProps {
    size: "larg" | "small" | "mini" | "default"
}


declare class AvatarItem extends React.Component<AvatarItemProps, any> {
    constructor(props: AvatarItemProps);
}

export default class AvatarList extends React.Component<AvatarListProps, any> {
    constructor(props: AvatarListProps);
    static Item: typeof AvatarItem;
}
