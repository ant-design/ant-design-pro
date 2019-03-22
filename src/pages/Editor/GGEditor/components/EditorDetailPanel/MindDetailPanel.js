import React from 'react';
import { Card } from 'antd';
import { NodePanel, CanvasPanel, DetailPanel } from 'gg-editor';
import NodeDetail from './NodeDetail';
import styles from './index.less';

const MindDetailPanel = () => {
  return (
    <DetailPanel className={styles.detailPanel}>
      <NodePanel>
        <NodeDetail />
      </NodePanel>
      <CanvasPanel>
        <Card type="inner" size="small" title="Canvas" bordered={false} />
      </CanvasPanel>
    </DetailPanel>
  );
};

export default MindDetailPanel;
