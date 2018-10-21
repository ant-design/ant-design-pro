import React from 'react';
import loading from '@/assets/loading.gif';
// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div style={{ paddingTop: 100, textAlign: 'center' }}>
    <img src={loading} />
  </div>
);
