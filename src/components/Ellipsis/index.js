import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

/* eslint react/no-did-mount-set-state: 0 */

const EllipsisText = ({ text, length, tooltip, ...other }) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
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
  state = {
    lineHeight: 0,
    text: '',
    targetCount: 0,
  }

  componentDidMount() {
    const { lines, cover } = this.props;
    if (this.node) {
      if (lines && cover) {
        this.setState({
          lineHeight: parseInt(window.getComputedStyle(this.node).lineHeight, 10),
        });
      }
      this.computeLine();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.lines !== nextProps.lines || this.props.cover !== nextProps.cover) {
      this.setState({
        lineHeight: parseInt(window.getComputedStyle(this.node).lineHeight, 10),
      });
      this.computeLine();
    }
  }

  computeLine = () => {
    const { lines, cover } = this.props;
    if (lines && !cover) {
      const fontSize = parseInt(window.getComputedStyle(this.node).fontSize, 10) || 14;
      const text = this.shadowChildren.innerText;
      const targetWidth = (this.node.offsetWidth || this.node.parentNode.offsetWidth) * lines;
      const shadowNode = this.shadow.firstChild;
      shadowNode.innerHTML = text;
      let count = 1;
      while (count < text.length) {
        shadowNode.innerHTML = text.substring(0, count);
        if (shadowNode.offsetWidth > (targetWidth - (lines * (fontSize / 2)) - fontSize)) {
          break;
        }
        count += 1;
      }
      this.setState({
        text,
        targetCount: count,
      });
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  handleShadow = (n) => {
    this.shadow = n;
  }

  handleShadowChildren = (n) => {
    this.shadowChildren = n;
  }

  render() {
    const { text, targetCount, lineHeight } = this.state;
    const {
      children,
      lines,
      length,
      cover = false,
      suffixColor = '#fff',
      suffixOffset = 0,
      className,
      tooltip,
      ...restProps
    } = this.props;

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: (lines && !cover),
      [styles.linesCover]: (lines && cover),
    });

    if (!lines && !length) {
      return (<span className={cls} {...restProps}>{children}</span>);
    }

    // length
    if (!lines) {
      return (<EllipsisText className={cls} length={length} text={children || ''} tooltip={tooltip} {...restProps} />);
    }

    const l = lines || 1;

    // lines cover
    if (cover) {
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
          maxHeight: `${l * lineHeight}px`,
        }}
        >
          <style>{style}</style>
          {children}
        </div>
      );
    }

    // lines no cover
    const suffix = tooltip ? <Tooltip title={text}>...</Tooltip> : '...';

    return (
      <div
        {...restProps}
        ref={this.handleRef}
        className={cls}
      >
        {
          (targetCount > 0) && text.substring(0, targetCount)
        }
        {
          (targetCount > 0) && (targetCount < text.length) && suffix
        }
        <div className={styles.shadow} ref={this.handleShadowChildren}>{children}</div>
        <div className={styles.shadow} ref={this.handleShadow}><span>{text}</span></div>
      </div>
    );
  }
}
