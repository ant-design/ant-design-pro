import { Spin } from 'antd';
import isEqual from 'lodash/isEqual';
import React from 'react';
import { isComponentClass } from './Secured';

export type AnyComponent = React.Component | React.FunctionComponent;

export interface PromiseRenderPorps {
  error?: AnyComponent | React.ReactNode;
  ok?: AnyComponent | React.ReactNode;
  promise: Promise<any>;
}

interface PromiseRenderState {
  component?: AnyComponent;
}

export default class PromiseRender extends React.Component<PromiseRenderPorps, PromiseRenderState> {
  state = {
    component: null,
  };

  shouldComponentUpdate = (nextProps: PromiseRenderPorps, nextState: PromiseRenderState) => {
    const { component } = this.state;
    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps);
    }
    if (nextState.component !== component) return true;
    return false;
  };

  componentDidMount() {
    this.setRenderComponent(this.props);
  }

  // set render Component : ok or error
  setRenderComponent(props: PromiseRenderPorps) {
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
  checkIsInstantiation = (target: AnyComponent | React.ReactNode): AnyComponent => {
    if (isComponentClass(target)) {
      const Target: React.ComponentClass = target as any;
      return (props: any) => <Target {...props} />;
    } else if (React.isValidElement(target)) {
      return (props => React.cloneElement(target, props)) as React.FC;
    }
    return (() => target) as React.FC;
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
