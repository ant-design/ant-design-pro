import React from 'react';

export type IReactComponent<P = any> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>;

function computeHeight(node: HTMLDivElement) {
  const { style } = node;
  style.height = '100%';
  const totalHeight = parseInt(`${getComputedStyle(node).height}`, 10);
  const padding =
    parseInt(`${getComputedStyle(node).paddingTop}`, 10) +
    parseInt(`${getComputedStyle(node).paddingBottom}`, 10);
  return totalHeight - padding;
}

function getAutoHeight(n: HTMLDivElement | undefined) {
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

interface AutoHeightProps {
  height?: number;
}

function autoHeight() {
  return <P extends AutoHeightProps>(
    WrappedComponent: React.ComponentClass<P> | React.FC<P>,
  ): React.ComponentClass<P> => {
    class AutoHeightComponent extends React.Component<P & AutoHeightProps> {
      state = {
        computedHeight: 0,
      };

      root: HTMLDivElement | undefined = undefined;

      componentDidMount() {
        const { height } = this.props;
        if (!height) {
          let h = getAutoHeight(this.root);
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
