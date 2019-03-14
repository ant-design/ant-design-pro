import * as React from 'react';
import { DropDownProps } from 'antd/lib/dropdown';

export interface IHeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
}

export default class HeaderDropdown extends React.Component<IHeaderDropdownProps, any> {}
