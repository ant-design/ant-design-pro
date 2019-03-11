import React, { ReactNode, SFC } from 'react';

interface BlankLayoutProps {
  children: ReactNode;
}

const Layout: SFC<BlankLayoutProps> = ({ children }) => <div>{children}</div>;

export default Layout;
