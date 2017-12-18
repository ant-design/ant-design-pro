import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
import Slider from 'bizcharts-plugin-slier';
import styles from './index.less';

class TimelineChart extends Component {
  render() {
    const {
      title,
      height = 400,
      padding = [60, 20, 40, 40],
      titleMap = {
        y1: 'y1',
        y2: 'y2',
      },
      borderWidth = 2,
      data = [
        {
          x: 0,
          y1: 0,
          y2: 0,
        },
      ],
    } = this.props;

    let max;
    if (data[0] && data[0].y1 && data[0].y2) {
      max = Math.max(
        data.sort((a, b) => b.y1 - a.y1)[0].y1,
        data.sort((a, b) => b.y2 - a.y2)[0].y2
      );
    }
    const ds = new DataSet({
      state: {
        start: data[0].x,
        end: data[data.length - 1].x,
      },
    });
    const dv = ds.createView();
    dv
      .source(data)
      .transform({
        type: 'map',
        callback(row) {
          const newRow = { ...row };
          newRow[titleMap.y1] = row.y1;
          newRow[titleMap.y2] = row.y2;
          return newRow;
        },
      })
      .transform({
        type: 'filter',
        callback: (obj) => {
          const date = obj.x;
          return date <= ds.state.end && date >= ds.state.start;
        },
      })
      .transform({
        type: 'fold',
        fields: [titleMap.y1, titleMap.y2], // 展开字段集
        key: 'key', // key字段
        value: 'value', // value字段
      });

    const timeScale = {
      type: 'time',
      tickCount: 10,
      mask: 'HH:MM',
      range: [0, 1],
    };

    const cols = {
      x: timeScale,
      value: {
        max,
        min: 0,
      },
    };

    const SliderGen = () => (
      <Slider
        padding={[0, padding[1], 0, padding[3]]}
        width="auto"
        height={26}
        xAxis="x"
        yAxis="value"
        scales={{ x: timeScale }}
        data={dv}
        start={ds.state.start}
        end={ds.state.end}
        backgroundChart={{ type: 'line' }}
        onChange={({ startValue, endValue }) => {
          ds.setState('start', new Date(startValue).getTime());
          ds.setState('end', new Date(endValue).getTime());
        }}
      />
    );

    return (
      <div className={styles.timelineChart} style={{ height: height + 30 }}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart height={height} padding={padding} data={dv} scale={cols} forceFit>
            <Axis name="x" />
            <Tooltip />
            <Legend name="key" position="top" />
            <Geom type="line" position="x*value" size={borderWidth} color="key" />
          </Chart>
          <SliderGen />
        </div>
      </div>
    );
  }
}

export default TimelineChart;
