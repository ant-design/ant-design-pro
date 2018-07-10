import React from 'react';
import style from './index.less'

export default class MarginBar extends React.PureComponent {
  defVal = '8px';

  render() {
    const { children, left, top, right, bottom, inline } = this.props;
    const style = {};
    if (inline) {
      style.display = 'inline-block';
    }
    if (left != null) {
      style.marginLeft = left === true ? this.defVal : left;
    }
    if (top != null) {
      style.marginTop = top === true ? this.defVal : top;
    }
    if (right != null) {
      style.marginRight = right === true ? this.defVal : right;
    }
    if (bottom != null) {
      style.marginBottom = bottom === true ? this.defVal : bottom;
    }
    return <div className={style.bar} style={style}>{children}</div>;
  }
}
