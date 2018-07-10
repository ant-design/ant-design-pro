import React from 'react';
import style from './index.less'

export default class MarginBar extends React.PureComponent {
  defVal = '8px';

  render() {
    const { children } = this.props;
    return <div className={style.bar}>{children}</div>;
  }
}
