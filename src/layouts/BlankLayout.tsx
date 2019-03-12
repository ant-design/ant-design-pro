import React, { ReactNode, FunctionComponent } from 'react';

interface BlankLayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<BlankLayoutProps> = ({ children }) => <div>{children}</div>;

export default Layout;
