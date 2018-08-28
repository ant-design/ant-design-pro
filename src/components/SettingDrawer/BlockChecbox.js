import { Icon } from 'antd';
import React from 'react';
import style from './index.less';

const BlockChecbox = ({ value, onChange, list }) => {
  return (
    <div className={style.blockChecbox} key={value}>
      {list.map(item => {
        return (
          <div
            key={item.key}
            className={style.item}
            onClick={() => {
              onChange(item.key);
            }}
          >
            <img src={item.url} alt={item.key} />
            <div
              className={style.selectIcon}
              style={{
                display: value === item.key ? 'block' : 'none',
              }}
            >
              <Icon type="check" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlockChecbox;
