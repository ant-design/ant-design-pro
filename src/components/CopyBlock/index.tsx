import React from 'react';
import { Icon, Typography, Popover } from 'antd';
import { connect } from 'dva';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './index.less';

const firstUpperCase = (pathString: string): string => {
  return pathString
    .replace('.', '')
    .split(/\/|-/)
    .map((s): string => s.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()))
    .filter((s): boolean => !!s)
    .join('');
};
const BlockCodeView: React.SFC<{
  url: string;
}> = ({ url }) => {
  const blockUrl = `npx umi block add ${firstUpperCase(url)}  --path=${url}`;
  return (
    <div className={styles['copy-block-view']}>
      <Typography.Paragraph copyable={{ text: blockUrl }}>
        <code className={styles['copy-block-code']}>{blockUrl}</code>
      </Typography.Paragraph>
    </div>
  );
};

interface RoutingType {
  location: {
    pathname: string;
  };
}

export default connect(({ routing }: { routing: RoutingType }) => ({
  location: routing.location,
}))(({ location }: RoutingType) => {
  const url = location.pathname;
  return (
    <Popover
      title={<FormattedMessage id="app.preview.down.block" defaultMessage="下载此页面到本地项目" />}
      placement="topLeft"
      content={<BlockCodeView url={url} />}
      trigger="click"
    >
      <div className={styles['copy-block']}>
        <Icon type="download" />
      </div>
    </Popover>
  );
});
