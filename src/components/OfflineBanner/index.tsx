import { useIntl, useModel } from '@umijs/max';
import { Alert } from 'antd';

const OfflineBanner: React.FC = () => {
  const { isOnline } = useModel('network');
  const intl = useIntl();

  if (isOnline) return null;

  return (
    <Alert
      type="warning"
      banner
      closable={false}
      message={intl.formatMessage({ id: 'app.network.offline' })}
    />
  );
};

export default OfflineBanner;
