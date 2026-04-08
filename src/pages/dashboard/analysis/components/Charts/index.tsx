import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  ChartCard,
  Field,
};

export { ChartCard, Charts as default, Field, yuan };
