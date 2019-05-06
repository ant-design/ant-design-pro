import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';
import Bar from './Bar';
import Pie from './Pie';
import Gauge from './Gauge';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import WaterWave from './WaterWave';
import TagCloud from './TagCloud';
import TimelineChart from './TimelineChart';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};

export {
  Charts as default,
  yuan,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};
