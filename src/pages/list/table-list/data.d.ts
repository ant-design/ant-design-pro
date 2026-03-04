export type TableListItem = {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: 0 | 1 | 2 | 3;
  updatedAt: string;
  createdAt: string;
  progress: number;
};
