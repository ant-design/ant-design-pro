import React from 'react';

export type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

function computeHeight(node: HTMLDivElement) {
  node.style.height = '100%';
  const totalHeight = parseInt(getComputedStyle(node).height + '', 10);
  const padding =
    parseInt(getComputedStyle(node).paddingTop + '', 10) +
    parseInt(getComputedStyle(node).paddingBottom + '', 10);
  return totalHeight - padding;
}

function getAutoHeight(n: HTMLDivElement) {
  if (!n) {
    return 0;
  }

  const node = n;

  let height = computeHeight(node);
  const parentNode = node.parentNode as HTMLDivElement;
  if (parentNode) {
    height = computeHeight(parentNode);
  }

  return height;
}

interface IAutoHeightProps {
  height?: number;
}

function autoHeight() {
  return function<P extends IAutoHeightProps>(
    WrappedComponent: React.ComponentClass<P> | React.SFC<P>,
  ): React.ComponentClass<P> {
    class AutoHeightComponent extends React.Component<P & IAutoHeightProps> {
      state = {
        computedHeight: 0,
      };
      root!: HTMLDivElement;
      componentDidMount() {
        const { height } = this.props;
        if (!height) {
          let h = getAutoHeight(this.root);
          // eslint-disable-next-line
          this.setState({ computedHeight: h });
          if (h < 1) {
            h = getAutoHeight(this.root);
            this.setState({ computedHeight: h });
          }
        }
      }
      handleRoot = (node: HTMLDivElement) => {
        this.root = node;
      };
      render() {
        const { height } = this.props;
        const { computedHeight } = this.state;
        const h = height || computedHeight;
        return (
          <div ref={this.handleRoot}>
            {h > 0 && <WrappedComponent {...this.props} height={h} />}
          </div>
        );
      }
    }
    return AutoHeightComponent;
  };
}
export default autoHeight;
