import { Col, Row } from 'antd';
import { Axis, Chart, Coord, Geom, Tooltip } from 'bizcharts';
import React, { useEffect, useRef, useState } from 'react';

export type RadarProps = {
  title?: React.ReactNode;
  height?: number;
  padding?: [number, number, number, number];
  hasLegend?: boolean;
  data: {
    name: string;
    label: string;
    value: string | number;
  }[];
  colors?: string[];
  animate?: boolean;
  forceFit?: boolean;
  tickCount?: number;
  style?: React.CSSProperties;
};
type RadarState = {
  legendData: {
    checked: boolean;
    name: string;
    color: string;
    percent: number;
    value: string;
  }[];
};

const defaultColors = [
  '#1890FF',
  '#FACC14',
  '#2FC25B',
  '#8543E0',
  '#F04864',
  '#13C2C2',
  '#fa8c16',
  '#a0d911',
];

const Radar: React.FC<RadarProps> = (props) => {
  const {
    data = [],
    height = 0,
    title,
    hasLegend = false,
    forceFit = true,
    tickCount = 5,
    padding = [35, 30, 16, 30] as [number, number, number, number],
    animate = true,
    colors = defaultColors,
  } = props;

  const chartRef = useRef<G2.Chart>();
  const [legendData, setLegendData] = useState<RadarState['legendData']>([]);

  const getLegendData = () => {
    if (!chartRef.current) return;
    const geom = chartRef.current.getAllGeoms()[0];
    if (!geom) return;
    const items = (geom as any).get('dataArray') || [];

    const legendData = items.map((item: any[]) => {
      const origins = item.map((t) => t._origin);
      const result = {
        name: origins[0].name,
        color: item[0].color,
        checked: true,
        value: origins.reduce((p, n) => p + n.value, 0),
      };
      return result;
    });
    setLegendData(legendData);
  };

  useEffect(() => {
    getLegendData();
  }, [data]);

  const handleLegendClick = (item: any, i: string | number) => {
    const newItem = { ...item, checked: !item.checked };
    const newLegendData = [...legendData];
    newLegendData[i as number] = newItem;
    const filteredLegendData = newLegendData.filter((l) => l.checked).map((l) => l.name);
    if (chartRef.current) {
      chartRef.current.filter('name', (val) => filteredLegendData.indexOf(`${val}`) > -1);
      chartRef.current.repaint();
    }
    setLegendData(newLegendData);
  };

  const scale = {
    value: {
      min: 0,
      tickCount,
    },
  };

  const chartHeight = height - (hasLegend ? 80 : 22);

  return (
    <div style={{ height }}>
      {title && <h4>{title}</h4>}
      <Chart
        scale={scale}
        height={chartHeight}
        forceFit={forceFit}
        data={data}
        padding={padding}
        animate={animate}
        onGetG2Instance={(chart: G2.Chart) => {
          chartRef.current = chart;
        }}
      >
        <Tooltip />
        <Coord type="polar" />
        <Axis
          name="label"
          line={undefined}
          tickLine={undefined}
          grid={{
            lineStyle: {
              lineDash: undefined,
            },
            hideFirstLine: false,
          }}
        />
        <Axis
          name="value"
          grid={{
            type: 'polygon',
            lineStyle: {
              lineDash: undefined,
            },
          }}
        />
        <Geom type="line" position="label*value" color={['name', colors]} size={1} />
        <Geom
          type="point"
          position="label*value"
          color={['name', colors]}
          shape="circle"
          size={3}
        />
      </Chart>
      {hasLegend && (
        <Row>
          {legendData.map((item, i) => (
            <Col
              span={24 / legendData.length}
              key={item.name}
              onClick={() => handleLegendClick(item, i)}
            >
              <div>
                <p>
                  <span
                    style={{
                      backgroundColor: !item.checked ? '#aaa' : item.color,
                    }}
                  />
                  <span>{item.name}</span>
                </p>
                <h6>{item.value}</h6>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Radar;
