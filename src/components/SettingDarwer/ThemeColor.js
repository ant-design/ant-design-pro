import { Icon } from 'antd';
import React from 'react';
import styles from './ThemeColor.less';

const Tag = ({ color, check, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        backgroundColor: color,
      }}
    >
      {check ? <Icon type="check" /> : ''}
    </div>
  );
};

const ThemeColor = ({ colors, value, onChange }) => {
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
      <h3 className={styles.title}>主题色</h3>
      <div className={styles.content}>
        {colorList.map(color => {
          return (
            <Tag
              className={styles.colorBlock}
              key={color}
              color={color}
              check={value === color}
              onClick={() => onChange && onChange(color)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ThemeColor;
