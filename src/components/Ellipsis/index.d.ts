import React from 'react';
import { TooltipProps } from 'antd/lib/tooltip';

export interface EllipsisTooltipProps extends TooltipProps {
  title?: undefined;
  overlayStyle?: undefined;
}

export interface EllipsisProps {
  tooltip?: boolean | EllipsisTooltipProps;
  length?: number;
  lines?: number;
  style?: React.CSSProperties;
  className?: string;
  fullWidthRecognition?: boolean;
}

export function getStrFullLength(str: string): number;
export function cutStrByFullLength(str: string, maxLength: number): string;

export default class Ellipsis extends React.Component<EllipsisProps, any> {}
