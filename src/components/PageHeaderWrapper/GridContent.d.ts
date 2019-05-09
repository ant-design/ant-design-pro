import React from 'react';

export interface IGridContentProps {
  contentWidth: string;
  children: React.ReactNode;
}

export default class GridContent extends React.Component<IGridContentProps, any> {}
