
import React, { Component } from 'react';

export default () => (Comp) => {
  return class SafeStateWrapper extends Component {
    constructor(props) {
      super(props);
      this.mount = false;

      this.setStateSafe = this.setStateSafe.bind(this);
    }

    componentDidMount() {
      this.mount = true;
    }

    componentWillUnmount() {
      this.mount = false;
    }

    setStateSafe(...params) {
      return this.mount && this.child.setState(...params);
    }

    render() {
      return (
        <Comp
          {...this.props}

          ref={(ref) => { this.child = ref; }}
          setStateSafe={this.setStateSafe}
        />
      );
    }
  };
};
