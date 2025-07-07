import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    activeChart: {
      position: 'relative',
    },
    activeChartGrid: {
      p: { position: 'absolute', top: '80px' },
      'p:last-child': { top: '115px' },
    },
    activeChartLegend: {
      position: 'relative',
      height: '20px',
      marginTop: '8px',
      fontSize: '0',
      lineHeight: '20px',
      span: {
        display: 'inline-block',
        width: '33.33%',
        fontSize: '12px',
        textAlign: 'center',
      },
      'span:first-child': { textAlign: 'left' },
      'span:last-child': { textAlign: 'right' },
    },
    dashedLine: {
      position: 'relative',
      top: '-70px',
      left: '-3px',
      height: '1px',
    },
    line: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundImage:
        'linear-gradient(to right, transparent 50%, #e9e9e9 50%)',
      backgroundSize: '6px',
    },
    'dashedLine:last-child': {
      top: '-36px',
    },
  };
});
export default useStyles;
