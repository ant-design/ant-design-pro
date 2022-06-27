import { Col, Row } from 'antd';
import GGEditor, { Mind } from 'gg-editor';

import { PageContainer } from '@ant-design/pro-layout';
import EditorMinimap from './components/EditorMinimap';
import { MindContextMenu } from './components/EditorContextMenu';
import { MindDetailPanel } from './components/EditorDetailPanel';
import { MindToolbar } from './components/EditorToolbar';
import data from './worldCup2018.json';
import styles from './index.less';

GGEditor.setTrackable(false);

export default () => (
  <PageContainer content="脑图是表达发散性思维的有效图形思维工具 ，它简单却又很有效，是一种实用性的思维工具">
    <GGEditor className={styles.editor}>
      <Row className={styles.editorHd}>
        <Col span={24}>
          <MindToolbar />
        </Col>
      </Row>
      <Row className={styles.editorBd}>
        <Col span={20} className={styles.editorContent}>
          <Mind data={data} className={styles.mind} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <MindDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <MindContextMenu />
    </GGEditor>
  </PageContainer>
);
