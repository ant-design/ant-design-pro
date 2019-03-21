import React from 'react';
import { Tooltip, Divider } from 'antd';
import { Toolbar, Command } from 'gg-editor';
import { FlowIconFont } from '../../common/IconFont';
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
      <Command name="copy">
        <Tooltip title="Copy" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-copy-o" />
        </Tooltip>
      </Command>
      <Command name="paste">
        <Tooltip title="Paste" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-paster-o" />
        </Tooltip>
      </Command>
      <Command name="delete">
        <Tooltip title="Delete" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-delete-o" />
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
      <Command name="toBack">
        <Tooltip title="To Back" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-to-back" />
        </Tooltip>
      </Command>
      <Command name="toFront">
        <Tooltip title="To Front" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-to-front" />
        </Tooltip>
      </Command>
      <Divider type="vertical" />
      <Command name="multiSelect">
        <Tooltip title="Multi Select" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-select" />
        </Tooltip>
      </Command>
      <Command name="addGroup">
        <Tooltip title="Add Group" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-group" />
        </Tooltip>
      </Command>
      <Command name="unGroup">
        <Tooltip title="Ungroup" placement="bottom" overlayClassName={styles.tooltip}>
          <FlowIconFont type="icon-ungroup" />
        </Tooltip>
      </Command>
    </Toolbar>
  );
};

export default FlowToolbar;
