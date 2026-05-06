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

/**
 * Remove failed chunk script/link tags so the bundler runtime can retry loading.
 * Utoopack caches failed chunks as rejected promises; removing the DOM elements
 * and clearing its internal cache isn't possible via public API, but removing
 * the script tags gives us a clean slate on the next retry.
 */
function removeFailedChunkScripts() {
  const scripts = document.querySelectorAll(
    'script[src][data-failed], link[href][data-failed]',
  );
  for (const el of scripts) el.remove();
}

function renderErrorFallback(
  error: Error,
  isOnline: boolean,
  onReload: () => void,
  onRetry: () => void,
) {
  const intl = getIntl();
  const isOffline = !isOnline;
  const isChunkError = isChunkLoadError(error);

  const subTitleId = getSubTitleId(isChunkError, isOffline);

  const retryButton = isChunkError ? (
    <Button type="primary" key="retry" onClick={onRetry}>
      {intl.formatMessage({
        id: 'app.error.retry',
        defaultMessage: 'Retry',
      })}
    </Button>
  ) : null;

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
            id: subTitleId,
            defaultMessage:
              isChunkError && isOffline
                ? 'Your network connection has been lost. Please check your connection and reload.'
                : isChunkError
                  ? 'Page resources failed to load. Please reload and try again.'
                  : 'Sorry, an error occurred on this page. Please reload or go back to the home page.',
          })}
          extra={[
            retryButton,
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

  /** Soft retry: clear failed scripts, reset state, let React re-render. */
  handleRetry = () => {
    removeFailedChunkScripts();
    this.setState({ hasError: false, error: null });
  };

  /** Hard reload: full page refresh. */
  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError || !this.state.error) return this.props.children;
    return renderErrorFallback(
      this.state.error,
      this.isOnline,
      this.handleReload,
      this.handleRetry,
    );
  }
}
