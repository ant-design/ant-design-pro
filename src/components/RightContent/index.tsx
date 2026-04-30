import {
  BookOutlined,
  CheckOutlined,
  GlobalOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import {
  getAllLocales,
  getLocale,
  history,
  setLocale,
  useIntl,
} from '@umijs/max';
import type { MenuProps } from 'antd';
import React, { useMemo } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import { localeLabelMap } from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

export const DocLink: React.FC = () => {
  return (
    <span
      className="anticon"
      style={{ cursor: 'pointer', padding: '0 8px', fontSize: 16 }}
      onClick={() => {
        history.push('/welcome');
      }}
    >
      <BookOutlined />
    </span>
  );
};

const versionItems: MenuProps['items'] = [
  { key: 'https://v5.pro.ant.design', label: 'v5' },
  { key: 'https://v4.pro.ant.design', label: 'v4' },
  { key: 'https://v2.pro.ant.design', label: 'v2' },
  { key: 'https://v1.pro.ant.design', label: 'v1' },
];

const onVersionClick: MenuProps['onClick'] = ({ key }) => {
  window.open(key, '_blank', 'noopener,noreferrer');
};

export const VersionDropdown: React.FC = () => {
  const intl = useIntl();
  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onVersionClick,
        items: versionItems,
      }}
    >
      <span
        className="anticon"
        style={{ cursor: 'pointer', padding: '0 8px', fontSize: 16 }}
      >
        <HistoryOutlined />
      </span>
    </HeaderDropdown>
  );
};

export const LangDropdown: React.FC = () => {
  const allLocales = useMemo(() => getAllLocales(), []);
  const currentLocale = getLocale();
  const supportLocales = allLocales.filter((l) => l in localeLabelMap);

  if (supportLocales.length <= 1) {
    return null;
  }

  const langItems: MenuProps['items'] = [
    {
      key: 'lang',
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
  ];

  const onLangClick: MenuProps['onClick'] = ({ key }) => {
    if (key.startsWith('lang-')) {
      setLocale(key.replace('lang-', ''), false);
    }
  };

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onLangClick,
        items: langItems,
      }}
    >
      <span
        className="anticon"
        style={{ cursor: 'pointer', padding: '0 8px', fontSize: 16 }}
      >
        <GlobalOutlined />
      </span>
    </HeaderDropdown>
  );
};
