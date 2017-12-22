import React, { Component } from 'react';
import SiderMenu from './SiderMenu';
import Slippery from './SlipperyMeun';

export default class Index extends Component {
  state = {
    screenWidth: innerWidth,
  };
  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  resize = () => {
    this.setState({
      screenWidth: innerWidth,
    });
  };
  render() {
    if (this.state.screenWidth < 576) {
      return <Slippery {...this.props} />;
    } else {
      return <SiderMenu {...this.props} />;
    }
  }
}
