import { createStyles } from 'antd-style';

const useStyles = createStyles({
  tooltip: {
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
  },
});

export default useStyles;
