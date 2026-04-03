import type { AppConfig } from 'antd/es/app/context';
import { theme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { useModel } from '@umijs/max';

/**
 * Ant Design App Config
 * This provides dynamic theme configuration based on the current settings
 */
export default () => {
  const { initialState } = useModel('@@initialState');
  const isDark = initialState?.settings?.navTheme === 'realDark';

  const appConfig: AppConfig = {
    theme: {
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        fontFamily: 'AlibabaSans, sans-serif',
      },
    } as ThemeConfig,
  };

  return appConfig;
};
