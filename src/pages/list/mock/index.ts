import { DefaultOptionType } from 'antd/es/select';

export const categoryOptions: DefaultOptionType[] = Array.from({ length: 12 }).map((_, index) => ({
  value: `cat${index + 1}`,
  label: `类目${index + 1}`,
}));
