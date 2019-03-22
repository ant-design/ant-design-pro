import React from 'react';

export interface GridContentProps {
  contentWidth: string;
  children: React.ReactNode;
}

export default class GridContent extends React.Component<GridContentProps, any> {}
