import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'dva/router';
import Exception from 'components/Exception';

class Exception403 extends Component {
  render() {
    const { intl } = this.props;
    return (
      <Exception
        type="403"
        desc={intl.formatMessage({ id: 'app.exception.description.403' }, {})}
        style={{ minHeight: 500, height: '80%' }}
        linkElement={Link}
      />
    );
  }
}
export default injectIntl(Exception403);
