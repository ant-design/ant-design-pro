import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { Link } from 'dva/router';
import Exception from '@/components/Exception';

class Exception500 extends Component {
  render() {
    return (
      <Exception
        type="500"
        desc={formatMessage({ id: 'app.exception.description.500' }, {})}
        style={{ minHeight: 500, height: '80%' }}
        linkElement={Link}
        backText={formatMessage({ id: 'app.exception.back' })}
      />
    );
  }
}
export default Exception500;
