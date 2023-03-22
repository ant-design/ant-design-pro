import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    editor: {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      width: '100%',
      height: 'calc(100vh - 250px)',
      background: token.descriptionsBg,
    },
    editorHd: {
      padding: '8px',
      background: token.descriptionsBg,
      border: '1px solid @item-active-bg',
    },
    editorBd: {
      flex: '1',
    },
    'editorSidebar,.editorContent': {
      display: 'flex',
      flexDirection: 'column',
    },
    editorContent: {
      ':global': {
        'graph-container canvas': {
          verticalAlign: 'middle',
        },
      },
    },
    editorSidebar: {
      background: token.descriptionsBg,
      ':global': {
        'g6-editor-minimap-container': {
          background: 'none',
        },
      },
      '&:first-child': { borderRight: '1px solid @item-active-bg' },
      '&:last-child': { borderLeft: '1px solid @item-active-bg' },
    },
    'flow,.mind,.koni': {
      flex: '1',
    },
  };
});

export default useStyles;
