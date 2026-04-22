import { PageLoading } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import type { LatLngExpression } from 'leaflet';
import { useMemo } from 'react';
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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
    coordinates: [number, number]; // [lng, lat]
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

// Get color based on value using quantile scale
function getColor(value: number, maxVal: number): string {
  if (maxVal <= 0) return colors[0];
  const ratio = value / maxVal;
  const index = Math.min(Math.floor(ratio * colors.length), colors.length - 1);
  return colors[index];
}

// Calculate radius based on log scale
function getRadius(value: number, maxVal: number): number {
  if (maxVal <= 0) return 5;
  const normalized = Math.log10(value + 1) / Math.log10(maxVal + 1);
  return Math.max(3, Math.round(normalized * 25));
}

export default function MonitorMap() {
  const { isLoading, data: geoData } = useQuery<GeoData>({
    queryKey: ['map-data'],
    queryFn: async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
      );
      if (!res.ok) throw new Error('Fetch geoData failed');
      return res.json();
    },
  });

  const { validFeatures, maxVal, highlightFeatures } = useMemo(() => {
    if (!geoData?.features) {
      return { validFeatures: [], maxVal: 0, highlightFeatures: [] };
    }

    const valid = geoData.features.filter((f) => f.properties.cum_conf != null);
    const max = Math.max(...valid.map((f) => f.properties.cum_conf), 1);
    const highlight = valid.filter((f) => f.properties.cum_conf > 2000);

    return { validFeatures: valid, maxVal: max, highlightFeatures: highlight };
  }, [geoData]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <MapContainer
      center={[35, 110] as LatLngExpression}
      zoom={2}
      minZoom={1}
      maxZoom={10}
      style={{ height: 452, width: '100%', background: '#f0f2f5' }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validFeatures.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const { cum_conf } = feature.properties;
        const name =
          feature.properties.Short_Name_ZH || feature.properties.ADM0_NAME;

        return (
          <CircleMarker
            key={`${lat}-${lng}`}
            center={[lat, lng] as LatLngExpression}
            radius={getRadius(cum_conf, maxVal)}
            pathOptions={{
              fillColor: getColor(cum_conf, maxVal),
              fillOpacity: 0.8,
              color: '#fff',
              weight: 1,
            }}
          >
            <Tooltip>
              <div>
                <strong>{name}</strong>
                <br />
                累计确诊: {cum_conf.toLocaleString()}
              </div>
            </Tooltip>
          </CircleMarker>
        );
      })}
      {highlightFeatures.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const { cum_conf } = feature.properties;
        const name =
          feature.properties.Short_Name_ZH || feature.properties.ADM0_NAME;

        return (
          <CircleMarker
            key={`highlight-${lat}-${lng}`}
            center={[lat, lng] as LatLngExpression}
            radius={getRadius(cum_conf, maxVal) + 2}
            pathOptions={{
              fillColor: '#2171b5',
              fillOpacity: 0.9,
              color: '#084594',
              weight: 2,
            }}
          >
            <Tooltip permanent>{name}</Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
