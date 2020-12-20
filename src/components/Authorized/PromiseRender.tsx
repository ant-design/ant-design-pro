import React from 'react';
import { Spin } from 'antd';
import isEqual from 'lodash/isEqual';
import { isComponentClass } from './Secured';
// eslint-disable-next-line import/no-cycle

type PromiseRenderProps<T, K> = {
  ok: T;
  error: K;
  promise: Promise<boolean>;
};

type PromiseRenderState = {
  component: React.ComponentClass | React.FunctionComponent;
};

export default class PromiseRender<T, K> extends React.Component<
  PromiseRenderProps<T, K>,
  PromiseRenderState
> {
  state: PromiseRenderState = {
    component: () => null,
  };

  componentDidMount(): void {
    this.setRenderComponent(this.props);
  }

  shouldComponentUpdate = (
    nextProps: PromiseRenderProps<T, K>,
    nextState: PromiseRenderState,
  ): boolean => {
    const { component } = this.state;
    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps);
    }
    if (nextState.component !== component) return true;
    return false;
  };

  // set render Component : ok or error
  setRenderComponent(props: PromiseRenderProps<T, K>): void {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
        return true;
      })
      .catch(() => {
        this.setState({
          component: error,
        });
      });
  }

  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  checkIsInstantiation = (
    target: React.ReactNode | React.ComponentClass,
  ): React.FunctionComponent => {
    if (isComponentClass(target)) {
      const Target = target as React.ComponentClass;
      return (props: any) => <Target {...props} />;
    }
    if (React.isValidElement(target)) {
      return (props: any) => React.cloneElement(target, props);
    }
    return () => target as React.ReactNode & null;
  };

  render() {
    const { component: Component } = this.state;
    const { ok, error, promise, ...rest } = this.props;

    return Component ? (
      <Component {...rest} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
