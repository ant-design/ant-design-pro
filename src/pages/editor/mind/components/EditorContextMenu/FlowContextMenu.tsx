import { CanvasMenu, ContextMenu, EdgeMenu, GroupMenu, MultiMenu, NodeMenu } from 'gg-editor';
import MenuItem from './MenuItem';
import styles from './index.less';

const FlowContextMenu = () => (
  <ContextMenu className={styles.contextMenu}>
    <NodeMenu>
      <MenuItem command="copy" />
      <MenuItem command="delete" />
    </NodeMenu>
    <EdgeMenu>
      <MenuItem command="delete" />
    </EdgeMenu>
    <GroupMenu>
      <MenuItem command="copy" />
      <MenuItem command="delete" />
      <MenuItem command="unGroup" icon="ungroup" text="Ungroup" />
    </GroupMenu>
    <MultiMenu>
      <MenuItem command="copy" />
      <MenuItem command="paste" />
      <MenuItem command="addGroup" icon="group" text="Add Group" />
      <MenuItem command="delete" />
    </MultiMenu>
    <CanvasMenu>
      <MenuItem command="undo" />
      <MenuItem command="redo" />
      <MenuItem command="pasteHere" icon="paste" text="Paste Here" />
    </CanvasMenu>
  </ContextMenu>
);

export default FlowContextMenu;
