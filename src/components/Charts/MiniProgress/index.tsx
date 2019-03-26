import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';

interface MiniProgressProps {
  target: number;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
  targetLabel?: string;
}

const MiniProgress: React.FC<MiniProgressProps> = ({
  targetLabel,
  target,
  color = 'rgb(19, 194, 194)',
  strokeWidth,
  percent,
}) => (
  <div className={styles.miniProgress}>
    <Tooltip title={targetLabel}>
      <div className={styles.target} style={{ left: target ? `${target}%` : null }}>
        <span style={{ backgroundColor: color || null }} />
        <span style={{ backgroundColor: color || null }} />
      </div>
    </Tooltip>
    <div className={styles.progressWrap}>
      <div
        className={styles.progress}
        style={{
          backgroundColor: color || null,
          width: percent ? `${percent}%` : null,
          height: strokeWidth || null,
        }}
      />
    </div>
  </div>
);

export default MiniProgress;
