import { Tooltip } from 'antd';
import React from 'react';
export type MiniProgressProps = {
  target: number;
  targetLabel?: string;
  color?: string;
  size?: number;
  percent?: number;
  style?: React.CSSProperties;
};
const MiniProgress: React.FC<MiniProgressProps> = ({
  targetLabel,
  target,
  color = 'rgb(19, 194, 194)',
  size,
  percent,
}) => {
  return (
    <div>
      <Tooltip title={targetLabel}>
        <div
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
      <div
        style={{
          backgroundColor: color || undefined,
          width: percent ? `${percent}%` : undefined,
          height: size || undefined,
        }}
      />
    </div>
  );
};
export default MiniProgress;
