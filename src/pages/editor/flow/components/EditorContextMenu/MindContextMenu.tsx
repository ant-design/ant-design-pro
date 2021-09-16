import { CanvasMenu, ContextMenu, NodeMenu } from 'gg-editor';

import MenuItem from './MenuItem';
import styles from './index.less';

const MindContextMenu = () => (
  <ContextMenu className={styles.contextMenu}>
    <NodeMenu>
      <MenuItem command="append" text="Topic" />
      <MenuItem command="appendChild" icon="append-child" text="Subtopic" />
      <MenuItem command="collapse" text="Fold" />
      <MenuItem command="expand" text="Unfold" />
      <MenuItem command="delete" />
    </NodeMenu>
    <CanvasMenu>
      <MenuItem command="undo" />
      <MenuItem command="redo" />
    </CanvasMenu>
  </ContextMenu>
);

export default MindContextMenu;
