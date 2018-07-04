import React from 'react';
import BasecLayout from './BasicLayout';

// TODO routerData menuData etc...
export default props => {
  const { location, children } = props;
  return (
    <BasecLayout routerData={{}} menuData={[]} location={location}>
      {children}
    </BasecLayout>
  );
};
