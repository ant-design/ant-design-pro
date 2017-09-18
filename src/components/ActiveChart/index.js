import React, { PureComponent } from 'react';

import { NumberInfo, MiniArea } from '../Charts';
import { fixedZero } from '../../utils/utils';

import styles from './index.less';

function getActiveData() {
  const activeData = [];
  for (let i = 0; i < 24; i += 1) {
    activeData.push({
      x: `${fixedZero(i)}:00`,
      y: (i * 50) + (Math.floor(Math.random() * 200)),
    });
  }
  return activeData;
}

export default class ActiveChart extends PureComponent {
  state = {
    activeData: getActiveData(),
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        activeData: getActiveData(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { activeData = [] } = this.state;

    return (
      <div className={styles.activeChart}>
        <NumberInfo
          subTitle="目标评估"
          total="有望达到预期"
        />
        <div style={{ marginTop: 32 }}>
          <MiniArea
            animate={false}
            line
            color="#5DD1DD"
            height={84}
            yAxis={{
              tickCount: 3,
              tickLine: false,
              labels: false,
              title: false,
              line: false,
            }}
            data={activeData}
          />
        </div>
        {
          activeData && (
            <div className={styles.activeChartGrid}>
              <p>{[...activeData].sort()[activeData.length - 1].y + 200} 亿元</p>
              <p>{[...activeData].sort()[Math.floor(activeData.length / 2)].y} 亿元</p>
            </div>
          )
        }
        {
          activeData && (
            <div className={styles.activeChartLegend}>
              <span>00:00</span>
              <span>{activeData[Math.floor(activeData.length / 2)].x}</span>
              <span>{activeData[activeData.length - 1].x}</span>
            </div>
          )
        }
      </div>
    );
  }
}
