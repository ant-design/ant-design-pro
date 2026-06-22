import { formatYuan } from '@/utils/format';

const Yuan: React.FC<{ children: string | number }> = ({ children }) => {
  return <span>{formatYuan(children)}</span>;
};

export default Yuan;
