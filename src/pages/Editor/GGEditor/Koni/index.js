import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { KoniContextMenu } from '../components/EditorContextMenu';
import { KoniToolbar } from '../components/EditorToolbar';
import { KoniItemPanel } from '../components/EditorItemPanel';
import { KoniDetailPanel } from '../components/EditorDetailPanel';
import KoniCustomNode from './shape/nodes/KoniCustomNode';
import styles from '../Flow/index.less';
import { FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const KoniPage = () => {
  return (
    <PageHeaderWrapper
      title={<FormattedMessage id="app.editor.koni.title" />}
      content={<FormattedMessage id="app.editor.koni.description" />}
    >
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <KoniToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <KoniItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Koni className={styles.koni} />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <KoniDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <KoniCustomNode />
        <KoniContextMenu />
      </GGEditor>
    </PageHeaderWrapper>
  );
};

export default KoniPage;
