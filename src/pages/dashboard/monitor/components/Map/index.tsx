import { PageLoading } from '@ant-design/pro-components';
import { HeatmapLayer, MapboxScene, PointLayer } from '@antv/l7-react';
import { useEffect, useState } from 'react';

const colors = [
  '#eff3ff',
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#084594',
];

export default function MonitorMap() {
  const [data, setData] = useState<Record<string, unknown>[] | null>(null);
  const [grid, setGrid] = useState<Record<string, unknown>[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [geoData, gridData] = await Promise.all([
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
        ).then((d) => d.json()),
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/8990e8b4-c58e-419b-afb9-8ea3daff2dd1.json',
        ).then((d) => d.json()),
      ]);
      setData(geoData);
      setGrid(gridData);
      setLoading(true);
    }
    fetchData();
  }, []);

  return loading === false ? (
    <PageLoading />
  ) : (
    <MapboxScene
      map={{
        center: [110.19382669582967, 50.258134],
        pitch: 0,
        style: 'blank',
        zoom: 1,
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '452px',
      }}
    >
      {grid && (
        <HeatmapLayer
          key="1"
          source={{
            data: grid,
            transforms: [
              {
                type: 'hexagon',
                size: 800000,
                field: 'capacity',
                method: 'sum',
              },
            ],
          }}
          color={{
            values: '#ddd',
          }}
          shape={{
            values: 'hexagon',
          }}
          style={{
            coverage: 0.7,
            opacity: 0.8,
          }}
        />
      )}
      {data && [
        <PointLayer
          key="2"
          options={{
            autoFit: true,
          }}
          source={{
            data,
          }}
          scale={{
            values: {
              color: {
                field: 'cum_conf',
                type: 'quantile',
              },
              size: {
                field: 'cum_conf',
                type: 'log',
              },
            },
          }}
          color={{
            field: 'cum_conf',
            values: colors,
          }}
          shape={{
            values: 'circle',
          }}
          active={{
            option: {
              color: '#0c2c84',
            },
          }}
          size={{
            field: 'cum_conf',
            values: [0, 30],
          }}
          style={{
            opacity: 0.8,
          }}
        />,
        <PointLayer
          key="5"
          source={{
            data,
          }}
          color={{
            values: '#fff',
          }}
          shape={{
            field: 'Short_Name_ZH',
            values: 'text',
          }}
          filter={{
            field: 'cum_conf',
            values: (v) => {
              return v > 2000;
            },
          }}
          size={{
            values: 12,
          }}
          style={{
            opacity: 1,
            strokeOpacity: 1,
            strokeWidth: 0,
          }}
        />,
      ]}
    </MapboxScene>
  );
}
