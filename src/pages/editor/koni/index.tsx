import { Col, Row } from 'antd';
import GGEditor, { Koni } from 'gg-editor';

import { PageContainer } from '@ant-design/pro-layout';
import EditorMinimap from './components/EditorMinimap';
import { KoniContextMenu } from './components/EditorContextMenu';
import { KoniDetailPanel } from './components/EditorDetailPanel';
import { KoniItemPanel } from './components/EditorItemPanel';
import { KoniToolbar } from './components/EditorToolbar';
import styles from './index.less';

GGEditor.setTrackable(false);

export default () => (
  <PageContainer content="拓扑结构图是指由网络节点设备和通信介质构成的网络结构图">
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <KoniToolbar />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={2} className={styles.editorSidebar}>
          <KoniItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Koni className={styles.koni} />
        </Col>
        <Col span={6} className={styles.editorSidebar}>
          <KoniDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <KoniContextMenu />
    </GGEditor>
  </PageContainer>
);
