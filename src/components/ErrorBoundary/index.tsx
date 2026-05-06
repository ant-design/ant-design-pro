import { getIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

function isChunkLoadError(error: Error): boolean {
  return (
    error.name === 'ChunkLoadError' ||
    /(?:loading|failed to load) (?:css )?chunk/i.test(error.message) ||
    /Failed to fetch dynamically imported module/i.test(error.message)
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
  onReload: () => void,
) {
  const intl = getIntl();
  const isOffline = !isOnline;
  const isChunkError = isChunkLoadError(error);

  return (
    <Card variant="borderless" style={{ margin: 24 }}>
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
              ? 'Your network connection has been lost. Please check your connection and reload.'
              : isChunkError
                ? 'Page resources failed to load. Please reload and try again.'
                : 'Sorry, an error occurred on this page. Please reload or go back to the home page.',
        })}
        extra={[
          isChunkError && (
            <Button type="primary" key="retry" onClick={onRetry}>
              {intl.formatMessage({
                id: 'app.error.retry',
                defaultMessage: 'Retry',
              })}
            </Button>
          ),
          <Button
            type={isChunkError ? 'default' : 'primary'}
            key="reload"
            onClick={onReload}
          >
            {intl.formatMessage({
              id: 'app.error.reload',
              defaultMessage: 'Reload Page',
            })}
          </Button>,
          <Button href="/" key="home">
            {intl.formatMessage({
              id: 'app.error.home',
              defaultMessage: 'Back Home',
            })}
          </Button>,
        ].filter(Boolean)}
      />
    </Card>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isOnline: boolean;
  retryCount: number;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    retryCount: 0,
  };

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
    this.setState({ isOnline: true });
    if (
      this.state.hasError &&
      this.state.error &&
      isChunkLoadError(this.state.error)
    ) {
      window.location.reload();
    }
  };

  handleOffline = () => {
    this.setState({ isOnline: false });
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    // Incrementing retryCount changes the key on the children fragment,
    // forcing React to unmount and remount all lazy components.
    // This causes React.lazy to re-execute import() for the failed chunk.
    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryCount: prev.retryCount + 1,
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError || !this.state.error) {
      return (
        <React.Fragment key={this.state.retryCount}>
          {this.props.children}
        </React.Fragment>
      );
    }
    return renderErrorFallback(
      this.state.error,
      this.state.isOnline,
      this.handleRetry,
      this.handleReload,
    );
  }
}
