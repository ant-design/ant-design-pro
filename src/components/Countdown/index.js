import React, { Component } from 'react';

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

class CountDown extends Component {
  constructor(props) {
    super(props);

    const { lastTime } = this.initTime(props);

    this.state = {
      lastTime,
    };
  }

  componentDidMount() {
    this.tick();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.target !== nextProps.target) {
      const { lastTime } = this.initTime(nextProps);
      this.setState({
        lastTime,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  timer = 0;
  interval = 1000;
  initTime = (props) => {
    let lastTime = 0;
    let targetTime = 0;
    try {
      if (Object.prototype.toString.call(props.target) === '[object Date]') {
        targetTime = props.target.getTime();
      } else {
        targetTime = new Date(props.target).getTime();
      }
    } catch (e) {
      throw new Error('invalid target prop', e);
    }

    lastTime = targetTime - new Date().getTime();

    return {
      lastTime,
    };
  }
  // defaultFormat = time => (
  //  <span>{moment(time).format('hh:mm:ss')}</span>
  // );
  defaultFormat = (time) => {
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;

    const h = fixedZero(Math.floor(time / hours));
    const m = fixedZero(Math.floor((time - (h * hours)) / minutes));
    const s = fixedZero(Math.floor((time - (h * hours) - (m * minutes)) / 1000));
    return (
      <span>{h}:{m}:{s}</span>
    );
  }
  tick = () => {
    const { onEnd } = this.props;
    let { lastTime } = this.state;

    this.timer = setTimeout(() => {
      if (lastTime < this.interval) {
        clearTimeout(this.timer);
        this.setState({
          lastTime: 0,
        });

        if (onEnd) {
          onEnd();
        }
      } else {
        lastTime -= this.interval;
        this.setState({
          lastTime,
        });

        this.tick();
      }
    }, this.interval);
  }

  render() {
    const { format = this.defaultFormat } = this.props;
    const { lastTime } = this.state;

    const result = format(lastTime);

    return result;
  }
}

export default CountDown;
