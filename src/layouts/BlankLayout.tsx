import React from 'react';

const Layout: React.FC = ({ children }) => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
    }}
  >
    {children}
  </div>
);

export default Layout;
