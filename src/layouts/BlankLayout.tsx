import React, { ReactNode, SFC } from 'react';

interface IProps {
  children: ReactNode;
}

const Layout: SFC<IProps> = ({ children }) => <div>{children}</div>;

export default Layout;
