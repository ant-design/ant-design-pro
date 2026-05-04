import { getIntl } from '@umijs/max';
import { Alert } from 'antd';
import { useEffect, useState } from 'react';

const OfflineBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <Alert
      type="warning"
      banner
      closable={false}
      message={getIntl().formatMessage({ id: 'app.network.offline' })}
    />
  );
};

export default OfflineBanner;
