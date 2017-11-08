import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

const EllipsisText = ({ text, length, tooltip, ...other }) => {
  if (text.length <= length || length < 0) {
    return <span {...other}>{text}</span>;
  }
  const tail = '...';
  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = text.slice(0, (length - tail.length));
  }

  if (tooltip) {
    return <span>{displayText}<Tooltip title={text}>{tail}</Tooltip></span>;
  }

  return (
    <span {...other}>
      {displayText}{tail}
    </span>
  );
};

export default class Ellipsis extends PureComponent {
  componentDidMount() {
    if (this.node) {
      this.lineHeight = parseInt(window.getComputedStyle(this.node).lineHeight, 10);
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  render() {
    const {
      children,
      lines = 1,
      suffixColor = '#fff',
      suffixOffset = 0,
      text,
      className,
      ...restProps
    } = this.props;

    const cls = classNames(styles.ellipsis, className, {
      [styles.line]: !text,
    });

    if (text) {
      return (<EllipsisText className={cls} text={text} {...restProps} />);
    }

    const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;
    const style = `#${id}:before{background-color:${suffixColor};padding-left:${suffixOffset}px;}`;

    return (
      <div
        {...restProps}
        id={id}
        ref={this.handleRef}
        className={cls}
        style={{
          ...restProps.style,
          maxHeight: `${lines * this.lineHeight}px`,
        }}
      >
        <style>{style}</style>
        {children}
      </div>
    );
  }
}
