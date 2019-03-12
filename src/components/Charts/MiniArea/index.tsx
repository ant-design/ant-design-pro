import React from 'react';
import { Chart, Axis, AxisProps, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import styles from '../index.less';

interface MiniAreaProps {
  forceFit: boolean;
  color?: string;
  height?: number;
  borderColor?: string;
  line?: boolean;
  animate?: boolean;
  xAxis?: AxisProps;
  yAxis?: AxisProps;
  borderWidth: number;
  scale: any;
  data: Array<{
    x: number | string;
    y: number;
  }>;
}

const MiniArea: React.FunctionComponent<MiniAreaProps> = props => {
  const {
    height,
    data = [],
    forceFit = true,
    color = 'rgba(24, 144, 255, 0.2)',
    borderColor = '#1089ff',
    scale = {},
    borderWidth = 2,
    line,
    xAxis,
    yAxis,
    animate = true,
  } = props;

  const padding: [number, number, number, number] = [36, 5, 30, 5];

  const scaleProps = {
    x: {
      type: 'cat',
      range: [0, 1],
      ...scale.x,
    },
    y: {
      min: 0,
      ...scale.y,
    },
  };

  const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
    'x*y',
    (x, y) => ({
      name: x,
      value: y,
    }),
  ];

  const chartHeight = height + 54;

  return (
    <div className={styles.miniChart} style={{ height }}>
      <div className={styles.chartContent}>
        {height > 0 && (
          <Chart
            animate={animate}
            scale={scaleProps}
            height={chartHeight}
            forceFit={forceFit}
            data={data}
            padding={padding}
          >
            <Axis
              key="axis-x"
              name="x"
              label={false}
              line={false}
              tickLine={false}
              grid={false}
              {...xAxis}
            />
            <Axis
              key="axis-y"
              name="y"
              label={false} //https://github.com/alibaba/BizCharts/pull/756
              line={false}
              tickLine={false}
              grid={false}
              {...yAxis}
            />
            <Tooltip showTitle={false} crosshairs={false} />
            <Geom
              type="area"
              position="x*y"
              color={color}
              tooltip={tooltip}
              shape="smooth"
              style={{
                fillOpacity: 1,
              }}
            />
            {line ? (
              <Geom
                type="line"
                position="x*y"
                shape="smooth"
                color={borderColor}
                size={borderWidth}
                tooltip={false}
              />
            ) : (
              <span style={{ display: 'none' }} />
            )}
          </Chart>
        )}
      </div>
    </div>
  );
};

export default autoHeight()(MiniArea);
