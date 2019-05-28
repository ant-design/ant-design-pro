import React from 'react';
import { Icon, Typography, Popover } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import * as H from 'history';
import { FormattedMessage } from 'umi-plugin-react/locale';

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
  const blockUrl = `npx umi block add ant-design-pro/${firstUpperCase(url)}  --path=${url}`;
  return (
    <div className={styles['copy-block-view']}>
      <Typography.Paragraph copyable>
        <code className={styles['copy-block-code']}>{blockUrl}</code>
      </Typography.Paragraph>
    </div>
  );
};

type RoutingType = { location: H.Location };

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
