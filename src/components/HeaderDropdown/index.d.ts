import { DropDownProps } from 'antd/lib/dropdown';
import React from 'react';

declare type OverlayFunc = () => React.ReactNode;

export interface IHeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
}

export default class HeaderDropdown extends React.Component<IHeaderDropdownProps, any> {}
