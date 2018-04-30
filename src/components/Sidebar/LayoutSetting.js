import { Tooltip } from 'antd';
import React from 'react';
import NavSate from './navState';

const LayoutSetting = ({ value, onChange }) => {
  return (
    <div
      style={{
        margin: 5,
        display: 'flex',
      }}
    >
      {['sidemenu', 'topmenu'].map(layout => (
        <div
          onClick={() => onChange && onChange(layout)}
          key={layout}
          style={{
            width: 70,
            height: 44,
            textAlign: 'center',
            margin: 8,
          }}
        >
          <NavSate type={layout} state={value === layout ? 'active' : 'default'} alt={layout} />
        </div>
      ))}
      <Tooltip title="等待后期实现！">
        <div
          key="topside"
          style={{
            width: 70,
            height: 44,
            textAlign: 'center',
            margin: 8,
          }}
        >
          <NavSate type="topside" state="disable" alt="topside" />
        </div>
      </Tooltip>
    </div>
  );
};

export default LayoutSetting;
