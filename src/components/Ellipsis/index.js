import React from 'react';
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
  const ellipsisText = (
    <span title={tooltip ? null : text} {...other}>
      {displayText}{tail}
    </span>
  );

  if (tooltip) {
    return <Tooltip title={text}>{ellipsisText}</Tooltip>;
  }
  return ellipsisText;
};

export default ({
  children,
  maxHeight = 20,
  suffixColor = '#fff',
  suffixOffset = 0,
  text,
  className,
  ...restProps
}) => {
  const cls = classNames(styles.ellipsis, className, {
    [styles.line]: !text,
  });

  if (text) {
    return (<EllipsisText className={cls} text={text} {...restProps} />);
  }

  const id = `antd-pro-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;
  const style = `#${id}:before{background-color:${suffixColor};padding-left:${suffixOffset}px;`;

  return (
    <div
      id={id}
      className={cls}
      {...restProps}
      style={{
        ...restProps.style,
        maxHeight,
      }}
    >
      <style>{style}</style>
      {children}
    </div>
  );
};
