import React from 'react';
import { Icon, Typography, Tooltip } from 'antd';
import styles from './index.less';
const firstUpperCase = (pathString: string) => {
  return pathString
    .replace('.', '')
    .split(/\/|\-/)
    .map(s => s.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()))
    .filter(s => s)
    .join('');
};
const BlockCodeView: React.SFC<{
  url: string;
}> = ({ url }) => {
  console.log(url);
  const blockUrl = `umi block add https://github.com/ant-design/pro-blocks/tree/master/${firstUpperCase(
    url,
  )} --npm-client=cnpm  --path=${url}`;
  return (
    <div className={styles['copy-block-view']}>
      <p className={styles['copy-block-text']}>下载到项目中：</p>
      <Typography.Paragraph copyable>
        <div className={styles['copy-block-code']}>{blockUrl}</div>
      </Typography.Paragraph>
    </div>
  );
};

export default ({ url }: { url: string }) => {
  return (
    <Tooltip placement="topLeft" title={<BlockCodeView url={url} />} trigger="click">
      <div className={styles['copy-block']}>
        <Icon type="download" />
      </div>
    </Tooltip>
  );
};
