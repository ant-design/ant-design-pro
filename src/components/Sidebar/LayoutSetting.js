import { Tooltip } from 'antd';
import React from 'react';
import NavSate from './navState';
import style from './index.less';

const LayoutSetting = ({ value, onChange }) => {
  return (
    <div className={style.layoutSetting}>
      {['sidemenu', 'topmenu'].map(layout => (
        <div className={style.item} onClick={() => onChange && onChange(layout)} key={layout}>
          <NavSate type={layout} state={value === layout ? 'active' : 'default'} alt={layout} />
        </div>
      ))}
      <Tooltip title="等待后期实现！">
        <div key="topside" className={style.item}>
          <NavSate type="topside" state="disable" alt="topside" />
        </div>
      </Tooltip>
    </div>
  );
};

export default LayoutSetting;
