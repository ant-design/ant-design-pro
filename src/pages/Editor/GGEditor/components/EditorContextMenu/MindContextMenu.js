import React from 'react';
import { Command, NodeMenu, CanvasMenu, ContextMenu } from 'gg-editor';
import { FlowIconFont, MindIconFont } from '../../common/IconFont';
import styles from './index.less';

const MindContextMenu = () => {
  return (
    <ContextMenu className={styles.contextMenu}>
      <NodeMenu>
        <Command name="append">
          <div className={styles.item}>
            <MindIconFont type="icon-append" />
            <span>Topic</span>
          </div>
        </Command>
        <Command name="appendChild">
          <div className={styles.item}>
            <MindIconFont type="icon-appendChild" />
            <span>Subtopic</span>
          </div>
        </Command>
        <Command name="collapse">
          <div className={styles.item}>
            <MindIconFont type="icon-collapse" />
            <span>Fold</span>
          </div>
        </Command>
        <Command name="expand">
          <div className={styles.item}>
            <MindIconFont type="icon-expand" />
            <span>Unfold</span>
          </div>
        </Command>
        <Command name="delete">
          <div className={styles.item}>
            <FlowIconFont type="icon-delete-o" />
            <span>Delete</span>
          </div>
        </Command>
      </NodeMenu>
      <CanvasMenu>
        <Command name="undo">
          <div className={styles.item}>
            <FlowIconFont type="icon-undo" />
            <span>Undo</span>
          </div>
        </Command>
        <Command name="redo">
          <div className={styles.item}>
            <FlowIconFont type="icon-redo" />
            <span>Redo</span>
          </div>
        </Command>
      </CanvasMenu>
    </ContextMenu>
  );
};

export default MindContextMenu;
