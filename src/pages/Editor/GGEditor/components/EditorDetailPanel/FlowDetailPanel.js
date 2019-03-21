import React from 'react';
import { Card } from 'antd';
import { NodePanel, EdgePanel, GroupPanel, MultiPanel, CanvasPanel, DetailPanel } from 'gg-editor';
import NodeDetail from '../NodeDetail';
import EdgeDetail from '../EdgeDetail';
import GroupDetail from '../GroupDetail';
import styles from './index.less';

const FlowDetailPanel = () => {
  return (
    <DetailPanel className={styles.detailPanel}>
      <NodePanel>
        <NodeDetail />
      </NodePanel>
      <EdgePanel>
        <EdgeDetail />
      </EdgePanel>
      <GroupPanel>
        <GroupDetail />
      </GroupPanel>
      <MultiPanel>
        <Card type="inner" size="small" title="Multi Select" bordered={false} />
      </MultiPanel>
      <CanvasPanel>
        <Card type="inner" size="small" title="Canvas" bordered={false} />
      </CanvasPanel>
    </DetailPanel>
  );
};

export default FlowDetailPanel;
