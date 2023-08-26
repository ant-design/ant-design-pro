import { Tooltip } from 'antd';
import React from 'react';
import useStyles from './index.style';
export type MiniProgressProps = {
  target: number;
  targetLabel?: string;
  color?: string;
  strokeWidth?: number;
  percent?: number;
  style?: React.CSSProperties;
};
const MiniProgress: React.FC<MiniProgressProps> = ({
  targetLabel,
  target,
  color = 'rgb(19, 194, 194)',
  strokeWidth,
  percent,
}) => {
  const { styles } = useStyles();
  return (
    <div className={styles.miniProgress}>
      <Tooltip title={targetLabel}>
        <div
          className={styles.target}
          style={{
            left: target ? `${target}%` : undefined,
          }}
        >
          <span
            style={{
              backgroundColor: color || undefined,
            }}
          />
          <span
            style={{
              backgroundColor: color || undefined,
            }}
          />
        </div>
      </Tooltip>
      <div className={styles.progressWrap}>
        <div
          className={styles.progress}
          style={{
            backgroundColor: color || undefined,
            width: percent ? `${percent}%` : undefined,
            height: strokeWidth || undefined,
          }}
        />
      </div>
    </div>
  );
};
export default MiniProgress;
