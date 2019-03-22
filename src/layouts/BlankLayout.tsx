import React, { ReactNode, FunctionComponent } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => <div>{children}</div>;

export default Layout;
