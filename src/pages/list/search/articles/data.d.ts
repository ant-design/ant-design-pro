export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}
