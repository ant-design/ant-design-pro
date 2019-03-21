import React from 'react';
import { Tooltip, Divider } from 'antd';
import { Toolbar, Command } from 'gg-editor';
import { FlowIconFont, MindIconFont } from '../../common/IconFont';
import styles from './index.less';

const FlowToolbar = () => {
  return (
    <Toolbar className={styles.toolbar}>
      <Command name="undo">
        <Tooltip title="Undo" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-undo" />
        </Tooltip>
      </Command>
      <Command name="redo">
        <Tooltip title="Redo" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-redo" />
        </Tooltip>
      </Command>
      <Divider type="vertical" />
      <Command name="zoomIn">
        <Tooltip title="Zoom In" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-zoom-in-o" />
        </Tooltip>
      </Command>
      <Command name="zoomOut">
        <Tooltip title="Zoom Out" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-zoom-out-o" />
        </Tooltip>
      </Command>
      <Command name="autoZoom">
        <Tooltip title="Fit Map" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-fit" />
        </Tooltip>
      </Command>
      <Command name="resetZoom">
        <Tooltip title="Actual Size" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-actual-size-o" />
        </Tooltip>
      </Command>
      <Divider type="vertical" />
      <Command name="append">
        <Tooltip title="Topic" placement="bottom" overlayClassName={styles.tooltip}>
          <MindIconFont type="icon-append" />
        </Tooltip>
      </Command>
      <Command name="appendChild">
        <Tooltip title="Subtopic" placement="bottom" overlayClassName={styles.tooltip}>
          <MindIconFont type="icon-appendChild" />
        </Tooltip>
      </Command>
      <Divider type="vertical" />
      <Command name="collapse">
        <Tooltip title="Fold" placement="bottom" overlayClassName={styles.tooltip}>
          <MindIconFont type="icon-collapse" />
        </Tooltip>
      </Command>
      <Command name="expand">
        <Tooltip title="Unfold" placement="bottom" overlayClassName={styles.tooltip}>
          <MindIconFont type="icon-expand" />
        </Tooltip>
      </Command>
    </Toolbar>
  );
};

export default FlowToolbar;
