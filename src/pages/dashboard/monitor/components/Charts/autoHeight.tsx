import React, { useEffect, useRef, useState } from 'react';

export type IReactComponent<P = any> = React.ComponentClass<P> | React.FC<P>;

function computeHeight(node: HTMLDivElement) {
  const { style } = node;
  style.height = '100%';
  const totalHeight = parseInt(`${getComputedStyle(node).height}`, 10);
  const padding =
    parseInt(`${getComputedStyle(node).paddingTop}`, 10) +
    parseInt(`${getComputedStyle(node).paddingBottom}`, 10);
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

type AutoHeightProps = {
  height?: number;
};

function autoHeight() {
  return <P extends AutoHeightProps>(
    WrappedComponent: React.ComponentClass<P> | React.FC<P>,
  ): React.FC<P & AutoHeightProps> => {
    const AutoHeightComponent: React.FC<P & AutoHeightProps> = (props) => {
      const [computedHeight, setComputedHeight] = useState(0);
      const rootRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        const { height } = props;
        if (!height && rootRef.current) {
          let h = getAutoHeight(rootRef.current);
          setComputedHeight(h);
          if (h < 1) {
            h = getAutoHeight(rootRef.current);
            setComputedHeight(h);
          }
        }
      }, [props]);

      const { height } = props;
      const h = height || computedHeight;

      return (
        <div ref={rootRef}>
          {h > 0 && <WrappedComponent {...props} height={h} />}
        </div>
      );
    };

    return AutoHeightComponent;
  };
}

export default autoHeight;
