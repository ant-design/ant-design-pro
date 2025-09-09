import { Skeleton } from 'antd';

const Loading: React.FC = () => (
  <Skeleton
    style={{
      margin: '24px 40px',
      height: '60vh',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}
    active
  />
);

export default Loading;
