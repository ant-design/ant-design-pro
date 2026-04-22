import { PageLoading } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import type { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

// Color palette matching the original L7 design
const colors = [
  '#eff3ff',
  '#c6dbef',
  '#9ecae1',
  '#6baed6',
  '#4292c6',
  '#2171b5',
  '#084594',
];

interface GeoFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    cum_conf: number;
    Short_Name_ZH: string;
    ADM0_NAME: string;
  };
}

interface GeoData {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

// World map GeoJSON URL (simplified world map from ECharts)
const WORLD_MAP_URL =
  'https://cdn.jsdelivr.net/npm/echarts@5/map/json/world.json';

export default function MonitorMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const { isLoading: geoLoading, data: geoData } = useQuery<GeoData>({
    queryKey: ['map-data'],
    queryFn: async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
      );
      if (!res.ok) throw new Error('Fetch geoData failed');
      return res.json();
    },
  });

  // Load world map
  useEffect(() => {
    const loadMap = async () => {
      try {
        const echarts = await import('echarts');
        const res = await fetch(WORLD_MAP_URL);
        const mapJson = await res.json();
        echarts.registerMap('world', mapJson);
        setMapLoaded(true);
      } catch (error) {
        console.error('Failed to load world map:', error);
      }
    };
    loadMap();
  }, []);

  const isLoading = geoLoading || !mapLoaded;

  if (isLoading) {
    return <PageLoading />;
  }

  // Transform GeoJSON features to scatter data
  const scatterData =
    geoData?.features
      .filter((f) => f.properties.cum_conf != null)
      .map((feature) => ({
        name: feature.properties.Short_Name_ZH || feature.properties.ADM0_NAME,
        value: [
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1],
          feature.properties.cum_conf,
        ],
      })) || [];

  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: (params: unknown) => {
        const p = params as { name: string; value?: [number, number, number] };
        if (p.value && p.value[2] != null) {
          return `${p.name}<br/>累计确诊: ${p.value[2].toLocaleString()}`;
        }
        return p.name;
      },
    },
    geo: {
      map: 'world',
      roam: true,
      zoom: 1.2,
      center: [110, 35],
      scaleLimit: {
        min: 1,
        max: 10,
      },
      itemStyle: {
        areaColor: '#f3f3f3',
        borderColor: '#999',
      },
      emphasis: {
        itemStyle: {
          areaColor: '#e0e0e0',
        },
      },
    },
    visualMap: {
      min: 0,
      max: Math.max(...scatterData.map((d) => d.value[2]), 100000),
      calculable: true,
      inRange: {
        color: colors,
      },
      text: ['高', '低'],
      textStyle: {
        color: '#666',
      },
      left: 20,
      bottom: 20,
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: scatterData,
        symbolSize: (val: number[]) => {
          const maxVal = Math.max(...scatterData.map((d) => d.value[2]), 1);
          const normalized = Math.log10(val[2] + 1) / Math.log10(maxVal + 1);
          return Math.max(5, normalized * 30);
        },
        itemStyle: {
          opacity: 0.8,
        },
        emphasis: {
          itemStyle: {
            color: '#0c2c84',
            opacity: 1,
          },
        },
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: scatterData.filter((d) => d.value[2] > 2000),
        symbolSize: (val: number[]) => {
          const maxVal = Math.max(...scatterData.map((d) => d.value[2]), 1);
          const normalized = Math.log10(val[2] + 1) / Math.log10(maxVal + 1);
          return Math.max(8, normalized * 25);
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 4,
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#333',
          fontSize: 11,
        },
        itemStyle: {
          color: '#2171b5',
          shadowBlur: 10,
          shadowColor: '#2171b5',
        },
        zlevel: 1,
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 452, width: '100%' }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
