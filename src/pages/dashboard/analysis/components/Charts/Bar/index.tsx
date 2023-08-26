import { Axis, Chart, Geom, Tooltip } from 'bizcharts';
import Debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useStyles from '../index.style';

export type BarProps = {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height?: number;
  data: {
    x: string;
    y: number;
  }[];
  forceFit?: boolean;
  autoLabel?: boolean;
  style?: React.CSSProperties;
};
const Bar: React.FC<BarProps> = ({
  height = 1,
  title,
  forceFit = true,
  data,
  color = 'rgba(24, 144, 255, 0.85)',
  padding,
  autoLabel = true,
}) => {
  const { styles } = useStyles();
  const [autoHideXLabels, setAutoHideXLabels] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const resize = useCallback(
    Debounce(() => {
      if (!nodeRef.current || !nodeRef.current.parentNode) {
        return;
      }
      const canvasWidth = nodeRef.current.parentNode?.clientWidth || 0;
      if (!autoLabel) {
        return;
      }
      const minWidth = data?.length * 30;
      if (canvasWidth <= minWidth) {
        if (!autoHideXLabels) {
          setAutoHideXLabels(true);
        }
      } else if (autoHideXLabels) {
        setAutoHideXLabels(false);
      }
    }, 500),
    [autoHideXLabels, autoLabel, data?.length],
  );

  useEffect(() => {
    window.addEventListener('resize', resize, {
      passive: true,
    });
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [resize]);

  const handleRoot = useCallback((n: HTMLDivElement) => {
    rootRef.current = n;
  }, []);

  const handleRef = useCallback((n: HTMLDivElement) => {
    nodeRef.current = n;
  }, []);

  const scale = {
    x: {
      type: 'cat',
    },
    y: {
      min: 0,
    },
  };

  const tooltip = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];

  return (
    <div className={styles.chart} style={{ height }} ref={handleRoot}>
      <div ref={handleRef}>
        {title && (
          <h4
            style={{
              marginBottom: 20,
            }}
          >
            {title}
          </h4>
        )}
        <Chart
          scale={scale}
          height={title ? height - 41 : height}
          forceFit={forceFit}
          data={data}
          padding={padding || 'auto'}
        >
          <Axis
            name="x"
            title={false}
            label={autoHideXLabels ? undefined : {}}
            tickLine={autoHideXLabels ? undefined : {}}
          />
          <Axis name="y" min={0} />
          <Tooltip showTitle={false} crosshairs={false} />
          <Geom type="interval" position="x*y" color={color} tooltip={tooltip} />
        </Chart>
      </div>
    </div>
  );
};

export default Bar;
