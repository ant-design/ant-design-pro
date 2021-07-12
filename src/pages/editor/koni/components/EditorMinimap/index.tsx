import { Card } from 'antd';
import { Minimap } from 'gg-editor';
import React from 'react';

const EditorMinimap = () => (
  <Card type="inner" size="small" title="Minimap" bordered={false}>
    <Minimap height={200} />
  </Card>
);

export default EditorMinimap;
