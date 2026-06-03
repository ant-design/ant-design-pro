import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  // Override ProLayout mobile drawer position to ensure it appears above the mask overlay.
  // `position: fixed` is needed because ProLayout uses `ant-drawer-inline` which sets
  // `position: absolute`, causing the drawer to render below the mask on mobile.
  // Cast via Record to satisfy createStyles' return type for dot-separated selectors.
  const drawerFix: Record<string, React.CSSProperties> = {
    '.ant-drawer.ant-drawer-inline.ant-pro-drawer-sider': {
      position:
        'fixed !important' as unknown as React.CSSProperties['position'],
    },
  };

  return {
    colorWeak: {
      filter: 'invert(80%)',
    },
    'ant-layout': {
      minHeight: '100vh',
    },
    'ant-pro-sider.ant-layout-sider.ant-pro-sider-fixed': {
      left: 'unset',
    },
    ...drawerFix,
    canvas: {
      display: 'block',
    },
    body: {
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'ul,ol': {
      listStyle: 'none',
    },
    '@media(max-width: 768px)': {
      'ant-table': {
        width: '100%',
        overflowX: 'auto',
        '&-thead > tr,    &-tbody > tr': {
          '> th,      > td': {
            whiteSpace: 'pre',
            '> span': {
              display: 'block',
            },
          },
        },
      },
    },
  };
});

export default useStyles;
