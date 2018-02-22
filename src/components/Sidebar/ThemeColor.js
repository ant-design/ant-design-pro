import React from 'react';
import { Tag } from 'antd';

const ThemeColor = ({ colors, value, onChange }) => {
  let colorList = colors;
  if (!colors) {
    colorList = [
      '#fa541c',
      '#faad14',
      '#fa8c16',
      '#ff4d4f',
      '#1890ff',
      '#fadb14',
      '#a0d911',
      '#36cfc9',
    ];
  }
  return (
    <div
      style={{
        margin: 5,
      }}
    >
      <h4>主题颜色</h4>
      {colorList.map(color => (
        <Tag
          className={value === color ? 'name' : ''}
          key={color}
          color={color}
          style={{ width: 22 }}
          onClick={() => onChange && onChange(color)}
        />
      ))}
    </div>
  );
};

export default ThemeColor;
