import {
  BookOutlined,
  CheckOutlined,
  GlobalOutlined,
  HistoryOutlined,
  LogoutOutlined,
  SettingOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import {
  getAllLocales,
  getLocale,
  history,
  setLocale,
  useIntl,
  useModel,
} from '@umijs/max';
import type { MenuProps } from 'antd';
import { Spin } from 'antd';
import React from 'react';
import { flushSync } from 'react-dom';
import { outLogin } from '@/services/ant-design-pro/api';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

const localeLabelMap: Record<string, { emoji: string; label: string }> = {
  'zh-CN': { emoji: '🇨🇳', label: '简体中文' },
  'zh-TW': { emoji: '🇭🇰', label: '繁体中文' },
  'en-US': { emoji: '🇺🇸', label: 'English' },
};

const supportLocaleKeys = Object.keys(localeLabelMap);

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({
  children,
}) => {
  const loginOut = async () => {
    await outLogin();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    const searchParams = new URLSearchParams({
      redirect: pathname + search,
    });
    const redirect = urlParams.get('redirect');
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: searchParams.toString(),
      });
    }
  };
  const { initialState, setInitialState } = useModel('@@initialState');
  const intl = useIntl();

  const onMenuClick: MenuProps['onClick'] = (event) => {
    const { key } = event;
    if (key === 'logout') {
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
      });
      loginOut();
      return;
    }
    if (key === 'theme') {
      setInitialState((s) => ({ ...s, settingDrawerOpen: true }));
      return;
    }
    if (key === 'doc') {
      history.push('/welcome');
      return;
    }
    if (key.startsWith('lang-')) {
      setLocale(key.replace('lang-', ''), false);
      return;
    }
    if (key.startsWith('version-')) {
      const url = key.replace('version-', '');
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    history.push(`/account/${key}`);
  };

  if (!initialState) {
    return <Spin size="small" />;
  }

  const { currentUser } = initialState;

  if (!currentUser) {
    return <Spin size="small" />;
  }

  const allLocales = getAllLocales();
  const currentLocale = getLocale();
  const supportLocales = allLocales.filter((l) =>
    supportLocaleKeys.includes(l),
  );

  const menuItems: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '个人设置',
    },
    {
      key: 'theme',
      icon: <SkinOutlined />,
      label: '主题设置',
    },
    {
      key: 'doc',
      icon: <BookOutlined />,
      label: '使用文档',
    },
    {
      key: 'version',
      icon: <HistoryOutlined />,
      label: intl.formatMessage({
        id: 'component.globalHeader.historyVersion',
      }),
      children: [
        {
          key: 'version-https://v5.pro.ant.design',
          label: 'v5',
        },
        {
          key: 'version-https://v4.pro.ant.design',
          label: 'v4',
        },
        {
          key: 'version-https://v2.pro.ant.design',
          label: 'v2',
        },
        {
          key: 'version-https://v1.pro.ant.design',
          label: 'v1',
        },
      ],
    },
    ...(supportLocales.length > 1
      ? [
          {
            key: 'lang',
            icon: <GlobalOutlined />,
            label: localeLabelMap[currentLocale]?.label ?? currentLocale,
            children: supportLocales.map((locale) => ({
              key: `lang-${locale}`,
              icon:
                locale === currentLocale ? (
                  <CheckOutlined style={{ color: '#52c41a' }} />
                ) : (
                  <span style={{ display: 'inline-block', width: 14 }} />
                ),
              label: `${localeLabelMap[locale]?.emoji ?? ''} ${localeLabelMap[locale]?.label ?? locale}`,
            })),
          },
        ]
      : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      placement="bottomRight"
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      arrow
    >
      {children}
    </HeaderDropdown>
  );
};
