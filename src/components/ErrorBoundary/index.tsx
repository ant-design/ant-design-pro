import { getIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

const CHUNK_ERROR_PATTERNS = [
  /(?:loading|failed to load) (?:css )?chunk/i,
  /imported module/i,
  /chunkloaderror/i,
];

function isChunkLoadError(error: Error): boolean {
  if (error.name === 'ChunkLoadError') return true;
  // Check both message and stack trace (React may wrap errors)
  const text = `${error.message}\n${error.stack ?? ''}`;
  return CHUNK_ERROR_PATTERNS.some((p) => p.test(text));
}

/** When offline, any render error is likely a chunk/network failure. */
function isNetworkRelatedError(error: Error, offline: boolean): boolean {
  return offline || isChunkLoadError(error);
}

function getTitleId(networkRelated: boolean): string {
  return networkRelated ? 'app.error.chunk.title' : 'app.error.render.title';
}

function getSubTitleId(networkRelated: boolean, offline: boolean): string {
  if (!networkRelated) return 'app.error.render.description';
  return offline
    ? 'app.error.chunk.description.offline'
    : 'app.error.chunk.description.online';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  isOnline: boolean;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
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
    // Auto-reload when coming back online if the error was network-related
    if (this.state.hasError && this.state.error) {
      window.location.reload();
    }
  };

  handleOffline = () => this.setState({ isOnline: false });

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleRetry = () => {
    // For network-related errors, always reload (re-setting state won't re-fetch the chunk)
    if (
      this.state.error &&
      isNetworkRelatedError(this.state.error, !this.state.isOnline)
    ) {
      window.location.reload();
    } else {
      this.setState({ hasError: false, error: null });
    }
  };

  render() {
    if (!this.state.hasError || !this.state.error) {
      return this.props.children;
    }

    const { error } = this.state;
    const intl = getIntl();
    const isOffline = !this.state.isOnline;
    const networkRelated = isNetworkRelatedError(error, isOffline);

    const title = intl.formatMessage({
      id: getTitleId(networkRelated),
      defaultMessage: networkRelated
        ? 'Failed to load page'
        : 'Something went wrong',
    });
    const subTitle = intl.formatMessage({
      id: getSubTitleId(networkRelated, isOffline),
      defaultMessage:
        networkRelated && isOffline
          ? 'Your network connection has been lost. Please check your connection and refresh.'
          : networkRelated
            ? 'Page resources failed to load. Please refresh and try again.'
            : 'Sorry, an error occurred on this page. Please refresh or go back to the home page.',
    });

    return (
      <Card variant="borderless">
        <Result
          status="error"
          title={title}
          subTitle={subTitle}
          extra={[
            <Button type="primary" key="retry" onClick={this.handleRetry}>
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
}
