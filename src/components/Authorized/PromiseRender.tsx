import { Spin } from 'antd';
import isEqual from 'lodash/isEqual';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import { isComponentClass } from './Secured';

interface IPromiseRenderProps {
  ok: React.ReactNode;
  error: React.ReactNode;
  promise: Promise<any>;
}

interface IPromiseRenderState {
  component: React.ComponentClass<any, any> | React.FunctionComponent<any>;
}

export default class PromiseRender extends React.Component<
  IPromiseRenderProps,
  IPromiseRenderState
> {
  state: IPromiseRenderState = {
    component: () => null,
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  shouldComponentUpdate = (nextProps: IPromiseRenderProps, nextState: IPromiseRenderState) => {
    const { component } = this.state;
    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps);
    }
    if (nextState.component !== component) return true;
    return false;
  };

  // set render Component : ok or error
  setRenderComponent(props: IPromiseRenderProps) {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        });
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
    target: React.ReactNode | React.ComponentClass<any, any>,
  ): React.FunctionComponent<any> => {
    if (isComponentClass(target)) {
      const Target = target as React.ComponentClass<any, any>;
      return (props: any) => <Target {...props} />;
    }
    if (React.isValidElement(target)) {
      return (props: any) => React.cloneElement(target, props);
    }
    return () => target as (React.ReactNode & null);
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
