import React from 'react';

export interface IBlockChecboxProps {
  value: string;
  onChange: (key: string) => void;
  list: any[];
}

export default class BlockChecbox extends React.Component<IBlockChecboxProps, any> {}
