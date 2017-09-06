import React from 'react';
import { Popover } from 'antd';

import styles from './index.less';

const MiniProgress = ({ target, color, strokeWidth, percent }) => (
  <div className={styles.miniProgress}>
    <Popover title={null} content={`目标值: ${target}%`}>
      <div
        className={styles.target}
        style={{ left: (target ? `${target}%` : null) }}
      >
        <span style={{ backgroundColor: (color || null) }} />
        <span style={{ backgroundColor: (color || null) }} />
      </div>
    </Popover>
    <div className={styles.progressWrap}>
      <div
        className={styles.progress}
        style={{
          backgroundColor: (color || null),
          width: (percent ? `${percent}%` : null),
          height: (strokeWidth || null),
        }}
      />
    </div>
  </div>
);

export default MiniProgress;
