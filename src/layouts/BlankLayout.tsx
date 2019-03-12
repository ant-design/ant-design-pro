import React, { ReactNode, FunctionComponent } from 'react';

interface IProps {
  children: ReactNode;
}

const Layout: FunctionComponent<IProps> = ({ children }) => <div>{children}</div>;

export default Layout;
