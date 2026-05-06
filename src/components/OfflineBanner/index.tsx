import { getIntl, useModel } from '@umijs/max';
import { Alert } from 'antd';

const OfflineBanner: React.FC = () => {
  const { isOnline } = useModel('network');

  if (isOnline) return null;

  return (
    <Alert
      type="warning"
      banner
      closable={false}
      message={getIntl().formatMessage({
        id: 'app.network.offline',
        defaultMessage:
          'You are currently offline. Some features may be unavailable.',
      })}
    />
  );
};

export default OfflineBanner;
