import React from 'react';
import { Link } from 'dva/router';
import Exception from '@/components/Exception';

export default () => (
  <Exception type="404" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
