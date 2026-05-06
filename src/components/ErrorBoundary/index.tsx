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

function renderErrorFallback(error: Error, onReload: () => void) {
  const intl = getIntl();
  const isOffline = !navigator.onLine;
  const isChunkError = isChunkLoadError(error);

  return (
    <div style={{ padding: 24 }}>
      <Card variant="borderless">
        <Result
          status="error"
          title={intl.formatMessage({
            id: isChunkError
              ? 'app.error.chunk.title'
              : 'app.error.render.title',
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
            <Button type="primary" key="reload" onClick={onReload}>
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
          ]}
        />
      </Card>
    </div>
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

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener('online', this.handleOnline);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnline);
  }

  /** Auto-reload when coming back online, but only for chunk load errors. */
  handleOnline = () => {
    if (
      this.state.hasError &&
      this.state.error &&
      isChunkLoadError(this.state.error)
    ) {
      window.location.reload();
    }
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError || !this.state.error) return this.props.children;
    return renderErrorFallback(this.state.error, this.handleReload);
  }
}
