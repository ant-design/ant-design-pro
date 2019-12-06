import { Col, Row } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';

GGEditor.setTrackable(false);

export default () => (
  <PageHeaderWrapper
    content={formatMessage({
      id: 'editorandflow.description',
      defaultMessage: 'description',
    })}
  >
    <GGEditor className={styles.editor}>
      <Row type="flex" className={styles.editorHd}>
        <Col span={24}>
          <FlowToolbar />
        </Col>
      </Row>
      <Row type="flex" className={styles.editorBd}>
        <Col span={4} className={styles.editorSidebar}>
          <FlowItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Flow className={styles.flow} />
        </Col>
        <Col span={4} className={styles.editorSidebar}>
          <FlowDetailPanel />
          <EditorMinimap />
        </Col>
      </Row>
      <FlowContextMenu />
    </GGEditor>
  </PageHeaderWrapper>
);
