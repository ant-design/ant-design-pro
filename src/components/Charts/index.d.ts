import * as numeral from 'numeral';
import { default as Bar } from './Bar';
import { default as ChartCard } from './ChartCard';
import { default as Field } from './Field';
import { default as Gauge } from './Gauge';
import { default as MiniArea } from './MiniArea';
import { default as MiniBar } from './MiniBar';
import { default as MiniProgress } from './MiniProgress';
import { default as Pie } from './Pie';
import { default as Radar } from './Radar';
import { default as TagCloud } from './TagCloud';
import { default as TimelineChart } from './TimelineChart';
import { default as WaterWave } from './WaterWave';

declare const yuan: (value: number | string) => string;

declare const Charts: {
  yuan: (value: number | string) => string;
  Bar: Bar;
  Pie: Pie;
  Gauge: Gauge;
  Radar: Radar;
  MiniBar: MiniBar;
  MiniArea: MiniArea;
  MiniProgress: MiniProgress;
  ChartCard: ChartCard;
  Field: Field;
  WaterWave: WaterWave;
  TagCloud: TagCloud;
  TimelineChart: TimelineChart;
};

export {
  Charts as default,
  yuan,
  Bar,
  Pie,
  Gauge,
  Radar,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};
