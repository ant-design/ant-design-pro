import { getIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

function isChunkLoadError(error: Error): boolean {
  return (
    error.name === 'ChunkLoadError' ||
    /(?:loading|failed to load) (?:css )?chunk/i.test(error.message) ||
    /imported module/i.test(error.message)
  );
}

function getSubTitleId(isChunkError: boolean, isOffline: boolean): string {
  if (!isChunkError) return 'app.error.render.description';
  return isOffline
    ? 'app.error.chunk.description.offline'
    : 'app.error.chunk.description.online';
}

function renderErrorFallback(
  error: Error,
  isOnline: boolean,
  onRetry: () => void,
) {
  const intl = getIntl();
  const isOffline = !isOnline;
  const isChunkError = isChunkLoadError(error);

  return (
    <Card variant="borderless">
      <Result
        status="error"
        title={intl.formatMessage({
          id: isChunkError ? 'app.error.chunk.title' : 'app.error.render.title',
          defaultMessage: isChunkError
            ? 'Failed to load page'
            : 'Something went wrong',
        })}
        subTitle={intl.formatMessage({
          id: getSubTitleId(isChunkError, isOffline),
          defaultMessage:
            isChunkError && isOffline
              ? 'Your network connection has been lost. Please check your connection and refresh.'
              : isChunkError
                ? 'Page resources failed to load. Please refresh and try again.'
                : 'Sorry, an error occurred on this page. Please refresh or go back to the home page.',
        })}
        extra={[
          <Button type="primary" key="retry" onClick={onRetry}>
            {intl.formatMessage({
              id: 'app.error.retry',
              defaultMessage: 'Refresh',
            })}
          </Button>,
          <Button href="/" key="home">
            {intl.formatMessage({
              id: 'app.error.home',
              defaultMessage: 'Back Home',
            })}
          </Button>,
        ]}
      />
    </Card>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
    window.removeEventListener('offline', this.handleOffline);
  }

  handleOnline = () => {
    this.isOnline = true;
    if (this.state.hasError) window.location.reload();
  };

  handleOffline = () => {
    this.isOnline = false;
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    if (this.state.error && isChunkLoadError(this.state.error)) {
      window.location.reload();
    } else {
      this.setState({ hasError: false, error: null });
    }
  };

  render() {
    if (!this.state.hasError || !this.state.error) return this.props.children;
    return renderErrorFallback(
      this.state.error,
      this.isOnline,
      this.handleRetry,
    );
  }
}
