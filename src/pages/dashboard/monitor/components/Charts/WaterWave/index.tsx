import React, { Component } from 'react';
import autoHeight from '../autoHeight';

/* eslint no-return-assign: 0 */
/* eslint no-mixed-operators: 0 */
// riddle: https://riddle.alibaba-inc.com/riddles/2d9a4b90

export type WaterWaveProps = {
  title: React.ReactNode;
  color?: string;
  height?: number;
  percent: number;
  style?: React.CSSProperties;
};
class WaterWave extends Component<WaterWaveProps> {
  state = {
    radio: 1,
  };
  timer: number = 0;
  root: HTMLDivElement | undefined | null = null;
  node: HTMLCanvasElement | undefined | null = null;
  componentDidMount() {
    this.renderChart();
    this.resize();
    window.addEventListener(
      'resize',
      () => {
        requestAnimationFrame(() => this.resize());
      },
      {
        passive: true,
      },
    );
  }
  componentDidUpdate(props: WaterWaveProps) {
    const { percent } = this.props;
    if (props.percent !== percent) {
      // 不加这个会造成绘制缓慢
      this.renderChart('update');
    }
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.timer);
    if (this.node) {
      this.node.innerHTML = '';
    }
    window.removeEventListener('resize', this.resize);
  }
  resize = () => {
    if (this.root) {
      const { height = 1 } = this.props;
      const { offsetWidth } = this.root.parentNode as HTMLElement;
      this.setState({
        radio: offsetWidth < height ? offsetWidth / height : 1,
      });
    }
  };
  renderChart(type?: string) {
    const { percent, color = '#1890FF' } = this.props;
    const data = percent / 100;
    cancelAnimationFrame(this.timer);
    if (!this.node || (data !== 0 && !data)) {
      return;
    }
    const canvas = this.node;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const radius = canvasWidth / 2;
    const lineWidth = 2;
    const cR = radius - lineWidth;
    ctx.beginPath();
    ctx.lineWidth = lineWidth * 2;
    const axisLength = canvasWidth - lineWidth;
    const unit = axisLength / 8;
    const range = 0.2; // 振幅
    let currRange = range;
    const xOffset = lineWidth;
    let sp = 0; // 周期偏移量
    let currData = 0;
    const waveupsp = 0.005; // 水波上涨速度

    let arcStack: number[][] = [];
    const bR = radius - lineWidth;
    const circleOffset = -(Math.PI / 2);
    let circleLock = true;
    for (
      let i = circleOffset;
      i < circleOffset + 2 * Math.PI;
      i += 1 / (8 * Math.PI)
    ) {
      arcStack.push([radius + bR * Math.cos(i), radius + bR * Math.sin(i)]);
    }
    const cStartPoint = arcStack.shift() as number[];
    ctx.strokeStyle = color;
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);
    const drawSin = () => {
      if (!ctx) {
        return;
      }
      ctx.beginPath();
      ctx.save();
      const sinStack = [];
      for (let i = xOffset; i <= xOffset + axisLength; i += 20 / axisLength) {
        const x = sp + (xOffset + i) / unit;
        const y = Math.sin(x) * currRange;
        const dx = i;
        const dy = 2 * cR * (1 - currData) + (radius - cR) - unit * y;
        ctx.lineTo(dx, dy);
        sinStack.push([dx, dy]);
      }
      const startPoint = sinStack.shift() as number[];
      ctx.lineTo(xOffset + axisLength, canvasHeight);
      ctx.lineTo(xOffset, canvasHeight);
      ctx.lineTo(startPoint[0], startPoint[1]);
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(1, color);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };
    const render = () => {
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      if (circleLock && type !== 'update') {
        if (arcStack.length) {
          const temp = arcStack.shift() as number[];
          ctx.lineTo(temp[0], temp[1]);
          ctx.stroke();
        } else {
          circleLock = false;
          ctx.lineTo(cStartPoint[0], cStartPoint[1]);
          ctx.stroke();
          arcStack = [];
          ctx.globalCompositeOperation = 'destination-over';
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          ctx.arc(radius, radius, bR, 0, 2 * Math.PI, true);
          ctx.beginPath();
          ctx.save();
          ctx.arc(radius, radius, radius - 3 * lineWidth, 0, 2 * Math.PI, true);
          ctx.restore();
          ctx.clip();
          ctx.fillStyle = color;
        }
      } else {
        if (data >= 0.85) {
          if (currRange > range / 4) {
            const t = range * 0.01;
            currRange -= t;
          }
        } else if (data <= 0.1) {
          if (currRange < range * 1.5) {
            const t = range * 0.01;
            currRange += t;
          }
        } else {
          if (currRange <= range) {
            const t = range * 0.01;
            currRange += t;
          }
          if (currRange >= range) {
            const t = range * 0.01;
            currRange -= t;
          }
        }
        if (data - currData > 0) {
          currData += waveupsp;
        }
        if (data - currData < 0) {
          currData -= waveupsp;
        }
        sp += 0.07;
        drawSin();
      }
      this.timer = requestAnimationFrame(render);
    };
    render();
  }
  render() {
    const { radio } = this.state;
    const { percent, title, height = 1 } = this.props;
    return (
      <div
        ref={(n) => {
          this.root = n;
        }}
        style={{
          transform: `scale(${radio})`,
        }}
      >
        <div
          style={{
            width: height,
            height,
            overflow: 'hidden',
          }}
        >
          <canvas
            ref={(n) => {
              this.node = n;
            }}
            width={height * 2}
            height={height * 2}
          />
        </div>
        <div
          style={{
            width: height,
          }}
        >
          {title && <span>{title}</span>}
          <h4>{percent}%</h4>
        </div>
      </div>
    );
  }
}
export default autoHeight()(WaterWave);
