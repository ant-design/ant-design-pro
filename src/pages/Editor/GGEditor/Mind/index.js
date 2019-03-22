import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Mind } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { MindContextMenu } from '../components/EditorContextMenu';
import { MindToolbar } from '../components/EditorToolbar';
import { MindDetailPanel } from '../components/EditorDetailPanel';
import data from '../mock/worldCup2018.json';
import styles from '../Flow/index.less';
import { FormattedMessage } from 'umi/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

GGEditor.setTrackable(false);

const MindPage = () => {
  return (
    <PageHeaderWrapper
      title={<FormattedMessage id="app.editor.mind.title" />}
      content={<FormattedMessage id="app.editor.mind.description" />}
    >
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <MindToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
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
    </PageHeaderWrapper>
  );
};

export default MindPage;
