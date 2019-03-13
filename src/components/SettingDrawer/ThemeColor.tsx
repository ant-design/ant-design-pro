import React from 'react';
import { Tooltip, Icon } from 'antd';
import { formatMessage } from 'umi-plugin-locale';
import styles from './ThemeColor.less';

export interface TagProps {
  color: string;
  check: boolean;
  className?: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ color, check, ...rest }) => (
  <div {...rest} style={{ backgroundColor: color }}>
    {check ? <Icon type="check" /> : ''}
  </div>
);

export interface ThemeColorProps {
  colors?: any[];
  title?: string;
  value: string;
  onChange: (color: string) => void;
}

const ThemeColor: React.FC<ThemeColorProps> = ({ colors, title, value, onChange }) => {
  const colorList = colors || [
    {
      key: 'dust',
      color: '#F5222D',
    },
    {
      key: 'volcano',
      color: '#FA541C',
    },
    {
      key: 'sunset',
      color: '#FAAD14',
    },
    {
      key: 'cyan',
      color: '#13C2C2',
    },
    {
      key: 'green',
      color: '#52C41A',
    },
    {
      key: 'daybreak',
      color: '#1890FF',
    },
    {
      key: 'geekblue',
      color: '#2F54EB',
    },
    {
      key: 'purple',
      color: '#722ED1',
    },
  ];
  return (
    <div className={styles.themeColor}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        {colorList.map(({ key, color }) => (
          <Tooltip key={color} title={formatMessage({ id: `app.setting.themecolor.${key}` })}>
            <Tag
              className={styles.colorBlock}
              color={color}
              check={value === color}
              onClick={() => onChange && onChange(color)}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default ThemeColor;
