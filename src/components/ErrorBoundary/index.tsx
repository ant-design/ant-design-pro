import { getIntl } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

function isChunkLoadError(error: Error): boolean {
  return (
    error.name === 'ChunkLoadError' ||
    /loading (?:css )?chunk/i.test(error.message) ||
    /imported module/i.test(error.message)
  );
}

function getSubTitleId(isChunkError: boolean, isOffline: boolean): string {
  if (!isChunkError) return 'app.error.render.description';
  return isOffline
    ? 'app.error.chunk.description.offline'
    : 'app.error.chunk.description.online';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

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
    if (!this.state.hasError || !this.state.error) {
      return this.props.children;
    }

    const { error } = this.state;
    const intl = getIntl();
    const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;
    const isChunkError = isChunkLoadError(error);

    const title = intl.formatMessage({
      id: isChunkError ? 'app.error.chunk.title' : 'app.error.render.title',
    });
    const subTitle = intl.formatMessage({
      id: getSubTitleId(isChunkError, isOffline),
    });

    return (
      <Card variant="borderless">
        <Result
          status="error"
          title={title}
          subTitle={subTitle}
          extra={[
            <Button type="primary" key="retry" onClick={this.handleRetry}>
              {intl.formatMessage({ id: 'app.error.retry' })}
            </Button>,
            <Button href="/" key="home">
              {intl.formatMessage({ id: 'app.error.home' })}
            </Button>,
          ]}
        />
      </Card>
    );
  }
}
