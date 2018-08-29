import { Icon } from 'antd';
import React from 'react';
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
      '#F5222D',
      '#FA541C',
      '#FAAD14',
      '#13C2C2',
      '#52C41A',
      '#1890FF',
      '#2F54EB',
      '#722ED1',
    ];
  }
  return (
    <div className={styles.themeColor}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        {colorList.map(color => (
          <Tag
            className={styles.colorBlock}
            key={color}
            color={color}
            check={value === color}
            onClick={() => onChange && onChange(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeColor;
