import React from 'react';

const Layout: React.FC = ({ children }) => (
  <div
    style={{
      width: '100vh',
      height: '100vh',
    }}
  >
    {children}
  </div>
);

export default Layout;
