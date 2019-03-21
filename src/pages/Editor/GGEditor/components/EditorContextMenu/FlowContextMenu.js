import React from 'react';
import {
  Command,
  NodeMenu,
  EdgeMenu,
  GroupMenu,
  MultiMenu,
  CanvasMenu,
  ContextMenu,
} from 'gg-editor';
import styles from './index.less';
import { FlowIconFont } from '../../common/IconFont';

const FlowContextMenu = () => {
  return (
    <ContextMenu className={styles.contextMenu}>
      <NodeMenu>
        <Command name="copy">
          <div className={styles.item}>
            <FlowIconFont type="icon-copy-o" />
            <span>Copy</span>
          </div>
        </Command>
        <Command name="delete">
          <div className={styles.item}>
            <FlowIconFont type="icon-delete-o" />
            <span>Delete</span>
          </div>
        </Command>
      </NodeMenu>
      <EdgeMenu>
        <Command name="delete">
          <div className={styles.item}>
            <FlowIconFont type="icon-delete-o" />
            <span>Delete</span>
          </div>
        </Command>
      </EdgeMenu>
      <GroupMenu>
        <Command name="copy">
          <div className={styles.item}>
            <FlowIconFont type="icon-copy-o" />
            <span>Copy</span>
          </div>
        </Command>
        <Command name="delete">
          <div className={styles.item}>
            <FlowIconFont type="icon-delete-o" />
            <span>Delete</span>
          </div>
        </Command>
        <Command name="unGroup">
          <div className={styles.item}>
            <FlowIconFont type="icon-ungroup" />
            <span>Ungroup</span>
          </div>
        </Command>
      </GroupMenu>
      <MultiMenu>
        <Command name="copy">
          <div className={styles.item}>
            <FlowIconFont type="icon-copy-o" />
            <span>Copy</span>
          </div>
        </Command>
        <Command name="paste">
          <div className={styles.item}>
            <FlowIconFont type="icon-paster-o" />
            <span>Paste</span>
          </div>
        </Command>
        <Command name="addGroup">
          <div className={styles.item}>
            <FlowIconFont type="icon-group" />
            <span>Add Group</span>
          </div>
        </Command>
        <Command name="delete">
          <div className={styles.item}>
            <FlowIconFont type="icon-delete-o" />
            <span>Delete</span>
          </div>
        </Command>
      </MultiMenu>
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
        <Command name="pasteHere">
          <div className={styles.item}>
            <FlowIconFont type="icon-paster-o" />
            <span>Paste</span>
          </div>
        </Command>
      </CanvasMenu>
    </ContextMenu>
  );
};

export default FlowContextMenu;
