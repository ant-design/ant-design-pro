import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import { FlowItemPanel } from '../components/EditorItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
import Save from "../components/Save";
import styles from './index.less';

GGEditor.setTrackable(false);

const ApiFlowPage = ({data,}) => {
  return (
    <GGEditor className={styles.editor}>
      <Row type="flex" className={styles.editorHd}>
        <Col span={20}>
          <FlowToolbar />
        </Col>
        <Col span={4} style={{height:25}}>
          <Save />
        </Col>
      </Row>
      {/*<Row type="flex" className={styles.editorBd}>*/}
        {/*<Col span={4} className={styles.editorSidebar}>*/}
          {/*<FlowItemPanel />*/}
        {/*</Col>*/}
        {/*<Col span={16} className={styles.editorContent}>*/}
          {/*<Flow className={styles.flow} data={data} />*/}
        {/*</Col>*/}
        {/*<Col span={4} className={styles.editorSidebar}>*/}
          {/*<FlowDetailPanel />*/}
          {/*<EditorMinimap />*/}
        {/*</Col>*/}
      {/*</Row>*/}
      <Row type="flex" className={styles.editorBd}>
        <Col span={24} className={styles.editorContent}>
          <Flow className={styles.flow} data={data} />
        </Col>
      </Row>
      <FlowContextMenu />
    </GGEditor>
  );
};

export default ApiFlowPage;
