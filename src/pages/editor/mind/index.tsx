import { Col, Row } from 'antd';
import GGEditor, { Mind } from 'gg-editor';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import EditorMinimap from './components/EditorMinimap';
import { MindContextMenu } from './components/EditorContextMenu';
import { MindDetailPanel } from './components/EditorDetailPanel';
import { MindToolbar } from './components/EditorToolbar';
import data from './worldCup2018.json';
import styles from './index.less';

GGEditor.setTrackable(false);

export default () => (
  <PageHeaderWrapper
    content={formatMessage({
      id: 'editorandmind.description',
      defaultMessage: 'description',
    })}
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
