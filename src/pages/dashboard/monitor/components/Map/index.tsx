import { PageLoading } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import * as d3 from 'd3';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { useEffect, useMemo, useRef } from 'react';
import { feature } from 'topojson-client';

// Color palette
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
  } | null;
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

// World map TopoJSON URL
const WORLD_MAP_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function getColor(value: number, maxVal: number): string {
  if (maxVal <= 0) return colors[0];
  const ratio = value / maxVal;
  const index = Math.min(Math.floor(ratio * colors.length), colors.length - 1);
  return colors[index];
}

function getRadius(value: number, maxVal: number): number {
  if (maxVal <= 0) return 3;
  const normalized = Math.log10(value + 1) / Math.log10(maxVal + 1);
  return Math.max(2, normalized * 10);
}

// Get coordinates from feature (safe accessor)
function getCoords(d: GeoFeature): [number, number] | null {
  return d.geometry?.coordinates ?? null;
}

export default function MonitorMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

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

  const { isLoading: worldLoading, data: worldData } = useQuery({
    queryKey: ['world-map'],
    queryFn: async () => {
      const res = await fetch(WORLD_MAP_URL);
      if (!res.ok) throw new Error('Fetch world map failed');
      return res.json();
    },
  });

  const { validFeatures, maxVal, highlightFeatures } = useMemo(() => {
    if (!geoData?.features) {
      return { validFeatures: [], maxVal: 0, highlightFeatures: [] };
    }
    const valid = geoData.features.filter(
      (f) => f.geometry && f.properties.cum_conf != null,
    );
    const max = Math.max(...valid.map((f) => f.properties.cum_conf), 1);
    const highlight = valid.filter((f) => f.properties.cum_conf > 2000);
    return { validFeatures: valid, maxVal: max, highlightFeatures: highlight };
  }, [geoData]);

  useEffect(() => {
    if (worldLoading || !worldData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth || 800;
    const height = 452;

    const projection = d3
      .geoNaturalEarth1()
      .scale(width / 5.5)
      .translate([width / 2, height / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topology = worldData as any;
    const countries = feature(
      topology,
      topology.objects.countries,
    ) as unknown as FeatureCollection<Geometry>;

    // Main group
    const g = svg.append('g');

    // Draw countries
    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', (d) => pathGenerator(d as Feature<Geometry>) || '')
      .attr('fill', '#e8e8e8')
      .attr('stroke', '#bbb')
      .attr('stroke-width', 0.5);

    // Draw data points
    if (validFeatures.length > 0) {
      g.selectAll('circle.data-point')
        .data(validFeatures)
        .enter()
        .append('circle')
        .attr('class', 'data-point')
        .attr('cx', (d) => {
          const coords = getCoords(d);
          if (!coords) return 0;
          const [lng, lat] = coords;
          const p = projection([lng, lat]);
          return p ? p[0] : 0;
        })
        .attr('cy', (d) => {
          const coords = getCoords(d);
          if (!coords) return 0;
          const [lng, lat] = coords;
          const p = projection([lng, lat]);
          return p ? p[1] : 0;
        })
        .attr('r', (d) => getRadius(d.properties.cum_conf, maxVal))
        .attr('fill', (d) => getColor(d.properties.cum_conf, maxVal))
        .attr('fill-opacity', 0.75)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .style('cursor', 'pointer')
        .on('mouseenter', function (_event, d) {
          d3.select(this).attr('fill-opacity', 1).attr('stroke-width', 2);
          if (tooltipRef.current) {
            const name = d.properties.Short_Name_ZH || d.properties.ADM0_NAME;
            tooltipRef.current.innerHTML = `<strong>${name}</strong><br/>累计确诊: ${d.properties.cum_conf.toLocaleString()}`;
            tooltipRef.current.style.opacity = '1';
          }
        })
        .on('mousemove', (event) => {
          if (tooltipRef.current) {
            tooltipRef.current.style.left = `${event.offsetX + 10}px`;
            tooltipRef.current.style.top = `${event.offsetY - 10}px`;
          }
        })
        .on('mouseleave', function () {
          d3.select(this).attr('fill-opacity', 0.75).attr('stroke-width', 0.5);
          if (tooltipRef.current) {
            tooltipRef.current.style.opacity = '0';
          }
        });

      // Highlight points with labels
      g.selectAll('circle.highlight-point')
        .data(highlightFeatures)
        .enter()
        .append('circle')
        .attr('class', 'highlight-point')
        .attr('cx', (d) => {
          const coords = getCoords(d);
          if (!coords) return 0;
          const [lng, lat] = coords;
          const p = projection([lng, lat]);
          return p ? p[0] : 0;
        })
        .attr('cy', (d) => {
          const coords = getCoords(d);
          if (!coords) return 0;
          const [lng, lat] = coords;
          const p = projection([lng, lat]);
          return p ? p[1] : 0;
        })
        .attr('r', (d) => getRadius(d.properties.cum_conf, maxVal) + 2)
        .attr('fill', '#2171b5')
        .attr('fill-opacity', 0.9)
        .attr('stroke', '#084594')
        .attr('stroke-width', 1);

      g.selectAll('text.label')
        .data(highlightFeatures)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', (d) => {
          const coords = getCoords(d);
          if (!coords) return 0;
          const [lng, lat] = coords;
          const p = projection([lng, lat]);
          return p ? p[0] + 6 : 0;
        })
        .attr('y', (d) => {
          const coords = getCoords(d);
          if (!coords) return 0;
          const [lng, lat] = coords;
          const p = projection([lng, lat]);
          return p ? p[1] + 4 : 0;
        })
        .text((d) => d.properties.Short_Name_ZH || d.properties.ADM0_NAME)
        .attr('font-size', '10px')
        .attr('fill', '#555')
        .attr('font-weight', '500');
    }
  }, [worldData, worldLoading, validFeatures, maxVal, highlightFeatures]);

  if (geoLoading || worldLoading) {
    return <PageLoading />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        style={{ width: '100%', height: 452, background: '#fafafa' }}
        viewBox="0 0 800 452"
        preserveAspectRatio="xMidYMid meet"
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: 'rgba(0,0,0,0.75)',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.15s',
          zIndex: 10,
        }}
      />
    </div>
  );
}
