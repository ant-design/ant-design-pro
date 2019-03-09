import React from 'react';
import { Tooltip, Icon } from 'antd';
import style from './index.less';

interface BlockChecboxProps {
  value: string;
  onChange: (key: string) => void;
  list: any[];
}
const BlockChecbox: React.SFC<BlockChecboxProps> = ({ value, onChange, list }) => (
  <div className={style.blockChecbox} key={value}>
    {list.map(item => (
      <Tooltip title={item.title} key={item.key}>
        <div className={style.item} onClick={() => onChange(item.key)}>
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
      </Tooltip>
    ))}
  </div>
);

export default BlockChecbox;
