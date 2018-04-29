import React from 'react';
import styles from './ThemeColor.less';

const Tag = ({ color, ...rest }) => {
  return (
    <div
      {...rest}
      style={{
        backgroundColor: color,
      }}
    />
  );
};

const ThemeColor = ({ colors, value, onChange }) => {
  let colorList = colors;
  if (!colors) {
    colorList = [
      '#F5222D',
      '#FA541C',
      '#FA8C16',
      '#FAAD14',
      '#FADB14',
      '#A0D911',
      '#52C41A',
      '#13C2C2',
      '#1890FF',
      '#2F54EB',
      '#722ED1',
      '#EB2F96',
    ];
  }
  return (
    <div className={styles.themeColor}>
      <h3 className={styles.title}>主题颜色</h3>
      {colorList.map(color => {
        const classname =
          value === color ? `${styles.colorBlock} ${styles.active}` : styles.colorBlock;
        return (
          <Tag
            className={classname}
            key={color}
            color={color}
            onClick={() => onChange && onChange(color)}
          />
        );
      })}
    </div>
  );
};

export default ThemeColor;
