import { formatYuan } from '@/utils/format';
import ChartCard from './ChartCard';
import Field from './Field';

const Charts = {
  yuan: formatYuan,
  ChartCard,
  Field,
};

export { ChartCard, Charts as default, Field, formatYuan as yuan };
