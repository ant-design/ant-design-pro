import { yuan } from '@/components/Charts';
import React from 'react';

interface IYuanProps {
  children: any;
}

/**
 * 减少使用 dangerouslySetInnerHTML
 */
export default class Yuan extends React.PureComponent<IYuanProps> {
  main: any;

  componentDidMount() {
    this.rendertoHtml();
  }

  componentDidUpdate() {
    this.rendertoHtml();
  }

  rendertoHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = yuan(children);
    }
  };

  render() {
    return (
      <span
        ref={ref => {
          this.main = ref;
        }}
      />
    );
  }
}
