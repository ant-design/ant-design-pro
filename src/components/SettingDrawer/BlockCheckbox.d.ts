import React from 'react';

export interface BlockChecboxProps {
  value: string;
  onChange: (key: string) => void;
  list: any[];
}

export default class BlockChecbox extends React.Component<BlockChecboxProps, any> {}
