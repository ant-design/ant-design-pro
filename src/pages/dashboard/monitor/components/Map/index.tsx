import { useQuery } from '@tanstack/react-query';
import { Button, Skeleton } from 'antd';
import * as d3 from 'd3';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { useEffect, useMemo, useRef } from 'react';
import { feature } from 'topojson-client';

const DATA_COLORS = [
  '#ede9fe',
  '#ddd6fe',
  '#c4b5fd',
  '#a78bfa',
  '#8b5cf6',
  '#7c3aed',
  '#6d28d9',
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

const WORLD_MAP_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const colorScale = d3.scaleQuantize<string>(DATA_COLORS).domain([0, 1]);

function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return `M${pts.join('L')}Z`;
}

function getColor(value: number, maxVal: number): string {
  return colorScale(maxVal <= 0 ? 0 : value / maxVal);
}

function getRadius(value: number, maxVal: number): number {
  if (maxVal <= 0) return 5;
  const normalized = Math.sqrt(value / maxVal);
  return Math.max(5, normalized * 28);
}

function getCoords(d: GeoFeature): [number, number] | null {
  return d.geometry?.coordinates ?? null;
}

function projectedPoint(
  d: GeoFeature,
  projection: d3.GeoProjection,
): [number, number] {
  const coords = getCoords(d);
  if (!coords) return [0, 0];
  const p = projection(coords);
  return p ? [p[0], p[1]] : [0, 0];
}

// Build a land bitmap via offscreen canvas for O(1) per-hex lookup
function buildLandBitmap(
  width: number,
  height: number,
  countries: FeatureCollection<Geometry>,
  pathGenerator: d3.GeoPath<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
): Uint8Array {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000';
  for (const f of countries.features) {
    const path = pathGenerator(f as Feature<Geometry>);
    if (path) {
      ctx.beginPath();
      // Use Path2D to parse the SVG path
      const p2d = new Path2D(path);
      ctx.fill(p2d);
    }
  }
  const data = ctx.getImageData(0, 0, width, height).data;
  const bitmap = new Uint8Array(width * height);
  for (let i = 0; i < bitmap.length; i++) {
    bitmap[i] = data[i * 4 + 3] > 0 ? 1 : 0;
  }
  return bitmap;
}

export default function MonitorMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const {
    isLoading: geoLoading,
    isError: geoError,
    refetch: refetchGeo,
    data: geoData,
  } = useQuery<GeoData>({
    queryKey: ['map-data'],
    queryFn: async () => {
      const res = await fetch(
        'https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json',
      );
      if (!res.ok) throw new Error('Fetch geoData failed');
      return res.json();
    },
  });

  const {
    isLoading: worldLoading,
    isError: worldError,
    refetch: refetchWorld,
    data: worldData,
  } = useQuery({
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
    const max = valid.reduce((m, f) => Math.max(m, f.properties.cum_conf), 1);
    const highlight = valid.filter((f) => f.properties.cum_conf > 2000);
    return { validFeatures: valid, maxVal: max, highlightFeatures: highlight };
  }, [geoData]);

  useEffect(() => {
    if (worldLoading || !worldData || !svgRef.current) return;

    let cancelled = false;
    const svg = d3.select(svgRef.current);

    function drawMap() {
      if (cancelled || !svgRef.current) return;
      svg.selectAll('*').interrupt();
      svg.selectAll('*').remove();

      const width = svgRef.current.clientWidth || 800;
      const height = svgRef.current.clientHeight || 380;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const topology = worldData as any;
      const countries = feature(
        topology,
        topology.objects.countries,
      ) as unknown as FeatureCollection<Geometry>;

      // Fit projection to container with small padding
      const projection = d3
        .geoNaturalEarth1()
        .fitSize(
          [width - 20, height - 10],
          countries as unknown as GeoJSON.FeatureCollection,
        );
      const pathGenerator = d3.geoPath().projection(projection);

      // ── Background ──
      svg
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', '#fff');

      const g = svg.append('g');

      // ── Hex grid via land bitmap ──
      const landBitmap = buildLandBitmap(
        width,
        height,
        countries,
        pathGenerator,
      );
      const hexR = 10;
      const hexW = Math.sqrt(3) * hexR;
      const hexH = 2 * hexR;
      const landHexes: { cx: number; cy: number }[] = [];

      for (let row = -1; row * (hexH * 0.75) < height + hexH; row++) {
        for (let col = -1; col * hexW < width + hexW; col++) {
          const cx = col * hexW + (row % 2 !== 0 ? hexW / 2 : 0);
          const cy = row * hexH * 0.75;
          const px = Math.round(cx);
          const py = Math.round(cy);
          if (
            px >= 0 &&
            px < width &&
            py >= 0 &&
            py < height &&
            landBitmap[py * width + px]
          ) {
            landHexes.push({ cx, cy });
          }
        }
      }

      // Draw land hexes
      g.selectAll('path.land-hex')
        .data(landHexes)
        .enter()
        .append('path')
        .attr('class', 'land-hex')
        .attr('d', (d) => hexPath(d.cx, d.cy, hexR - 0.25))
        .attr('fill', '#e8ecf1')
        .attr('stroke', '#cdd5de')
        .attr('stroke-width', 0.3);

      // ── Data points as circles ──
      if (validFeatures.length > 0) {
        function startPulse(el: SVGCircleElement) {
          if (cancelled) return;
          const d = d3.select(el).datum() as GeoFeature;
          const r = getRadius(d.properties.cum_conf, maxVal);
          d3.select(el)
            .transition()
            .duration(2000)
            .ease(d3.easeSinInOut)
            .attr('fill-opacity', 0.25)
            .attr('r', r * 0.85)
            .transition()
            .duration(2000)
            .ease(d3.easeSinInOut)
            .attr('fill-opacity', 0.55)
            .attr('r', r)
            .on('end', function () {
              startPulse(this);
            });
        }

        g.selectAll('circle.data-point')
          .data(validFeatures)
          .enter()
          .append('circle')
          .attr('class', 'data-point')
          .attr('cx', (d) => projectedPoint(d, projection)[0])
          .attr('cy', (d) => projectedPoint(d, projection)[1])
          .attr('r', (d) => getRadius(d.properties.cum_conf, maxVal))
          .attr('fill', (d) => getColor(d.properties.cum_conf, maxVal))
          .attr('fill-opacity', 0.4)
          .style('cursor', 'pointer')
          .each(function () {
            startPulse(this);
          })
          .on('mouseenter', function (_event, d) {
            d3.select(this).transition().duration(0).attr('fill-opacity', 0.85);
            if (tooltipRef.current) {
              const name = d.properties.Short_Name_ZH || d.properties.ADM0_NAME;
              tooltipRef.current.innerHTML = `<strong>${name}</strong><br/>交易量: ${d.properties.cum_conf.toLocaleString()}`;
              tooltipRef.current.style.opacity = '1';
            }
          })
          .on('mousemove', (event) => {
            if (tooltipRef.current) {
              const [x, y] = d3.pointer(event, svgRef.current);
              tooltipRef.current.style.left = `${x + 12}px`;
              tooltipRef.current.style.top = `${y - 12}px`;
            }
          })
          .on('mouseleave', function (_event, d) {
            const r = getRadius(d.properties.cum_conf, maxVal);
            d3.select(this)
              .transition()
              .duration(0)
              .attr('fill-opacity', 0.4)
              .attr('r', r);
            startPulse(this);
          });

        // Highlight circles
        g.selectAll('circle.highlight-point')
          .data(highlightFeatures)
          .enter()
          .append('circle')
          .attr('class', 'highlight-point')
          .attr('cx', (d) => projectedPoint(d, projection)[0])
          .attr('cy', (d) => projectedPoint(d, projection)[1])
          .attr('r', (d) => getRadius(d.properties.cum_conf, maxVal) + 2)
          .attr('fill', DATA_COLORS[3])
          .attr('fill-opacity', 0.3);
      }
    }

    drawMap();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!cancelled) drawMap();
      }, 200);
    });
    resizeObserver.observe(svgRef.current);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      svg.selectAll('*').interrupt();
    };
  }, [worldData, worldLoading, validFeatures, maxVal, highlightFeatures]);

  if (geoLoading || worldLoading) {
    return <Skeleton.Node active style={{ width: '100%', height: 356 }} />;
  }

  if (geoError || worldError) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 356,
          gap: 12,
        }}
      >
        <span style={{ color: '#999' }}>地图数据加载失败</span>
        <Button
          size="small"
          onClick={() => {
            refetchGeo();
            refetchWorld();
          }}
        >
          重试
        </Button>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg
        ref={svgRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: 8,
        }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          background: '#fff',
          color: '#334155',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s',
          zIndex: 10,
        }}
      />
    </div>
  );
}
