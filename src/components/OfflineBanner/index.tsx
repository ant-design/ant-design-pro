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
    <div
      style={{
        position: 'fixed',
        top: 0,
        insetInline: 0,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Alert
        type="warning"
        showIcon
        closable={false}
        style={{
          margin: 8,
          pointerEvents: 'auto',
          maxWidth: 480,
        }}
        message={getIntl().formatMessage({
          id: 'app.network.offline',
          defaultMessage:
            'You are currently offline. Some features may be unavailable.',
        })}
      />
    </div>
  );
};

export default OfflineBanner;
