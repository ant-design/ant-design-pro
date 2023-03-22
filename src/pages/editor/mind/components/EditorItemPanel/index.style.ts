import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    itemPanel: {
      flex: '1',
      ':global': {
        'ant-card': {
          height: '100%',
        },
        'ant-card-body': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '> div': { marginBottom: '16px' },
        },
      },
    },
  };
});

export default useStyles;
