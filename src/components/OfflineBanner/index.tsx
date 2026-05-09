import { getIntl } from '@umijs/max';
import { Alert } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';

const OfflineBanner: React.FC = () => {
  const isOnlineRef = useRef(true);
  const [, forceUpdate] = useState<number>(0);

  useEffect(() => {
    isOnlineRef.current = navigator.onLine;
    forceUpdate((n) => n + 1);
    const handleOnline = () => {
      isOnlineRef.current = true;
      forceUpdate((n: number) => n + 1);
    };
    const handleOffline = () => {
      isOnlineRef.current = false;
      forceUpdate((n: number) => n + 1);
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnlineRef.current) return null;

  return (
    <Alert
      type="warning"
      showIcon
      closable={false}
      style={{
        position: 'fixed',
        top: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        maxWidth: 480,
      }}
      message={getIntl().formatMessage({
        id: 'app.network.offline',
        defaultMessage:
          'You are currently offline. Some features may be unavailable.',
      })}
    />
  );
};

export default OfflineBanner;
