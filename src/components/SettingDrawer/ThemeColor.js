import React from 'react';
import { Tooltip, Icon } from 'antd';
import { formatMessage } from 'umi/locale';
import styles from './ThemeColor.less';

const Tag = ({ color, check, ...rest }) => (
  <div
    {...rest}
    style={{
      backgroundColor: color,
    }}
  >
    {check ? <Icon type="check" /> : ''}
  </div>
);

const ThemeColor = ({ colors, title, value, onChange }) => {
  let colorList = colors;
  if (!colors) {
    colorList = [
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
  }
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
