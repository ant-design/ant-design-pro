import { PageLoading } from '@ant-design/pro-components';
import { HeatmapLayer, MapboxScene, PointLayer } from '@antv/l7-react';
import { useQuery } from '@tanstack/react-query';
import { queryMapGeo, queryMapGrid } from '../../service';

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
  const { isLoading, data } = useQuery<{
    geoData: Record<string, unknown>[];
    grid: Record<string, unknown>[];
  }>({
    queryKey: ['map-data'],
    queryFn: async () => {
      const [geoData, gridData] = await Promise.all([
        queryMapGeo(),
        queryMapGrid(),
      ]);
      return { geoData, grid: gridData };
    },
  });

  return isLoading ? (
    <PageLoading />
  ) : (
    <MapboxScene
      map={{
        center: [110.19382669582967, 50.258134],
        pitch: 0,
        style: 'light',
        zoom: 1,
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '452px',
      }}
    >
      {data?.grid && (
        <HeatmapLayer
          key="1"
          source={{
            data: data.grid,
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
      {data?.geoData && [
        <PointLayer
          key="2"
          options={{
            autoFit: true,
          }}
          source={{
            data: data.geoData,
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
            data: data.geoData,
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
