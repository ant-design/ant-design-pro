import React, { PureComponent } from 'react';
import G2 from 'g2';
import Cloud from 'g-cloud';

/* eslint no-underscore-dangle: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-return-assign: 0 */

class TagCloud extends PureComponent {
  componentDidMount() {
    this.initTagCloud();
    this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.renderChart(nextProps.data);
    }
  }

  initTagCloud = () => {
    const Util = G2.Util;
    const Shape = G2.Shape;

    function getTextAttrs(cfg) {
      const textAttrs = Util.mix(true, {}, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.size,
        rotate: 0, // cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fill: cfg.color,
        textBaseline: 'Alphabetic',
      }, cfg.style);
      return textAttrs;
    }

    // 给point注册一个词云的shape
    Shape.registShape('point', 'cloud', {
      drawShape(cfg, container) {
        cfg.points = this.parsePoints(cfg.points);
        const attrs = getTextAttrs(cfg);
        const shape = container.addShape('text', {
          attrs: Util.mix(attrs, {
            x: cfg.points[0].x,
            y: cfg.points[0].y,
          }),
        });
        return shape;
      },
    });
  }

  renderChart(data) {
    if (!data || data.length < 1) {
      return;
    }

    const { height } = this.props;
    let width = 0;
    if (this.root) {
      width = this.root.offsetWidth;
    }

    // clean
    if (this.node) {
      this.node.innerHTML = '';
    }

    data.sort((a, b) => b.value - a.value);

    const max = data[0].value;
    const min = data[data.length - 1].value;

    // 构造一个词云布局对象
    const layout = new Cloud({
      words: data,
      width,
      height,

      // 设定文字大小配置函数(默认为12-40px的随机大小)
      size: words => (((words.value - min) / (max - min)) * 10) + 12,

      // 设定文字内容
      text: words => words.name,
    });

    // 执行词云布局函数，并在回调函数中调用G2对结果进行绘制
    layout.exec((texts) => {
      const chart = new G2.Chart({
        container: this.node,
        width,
        height,
        plotCfg: {
          margin: 0,
        },
      });

      chart.legend(false);
      chart.axis(false);
      chart.tooltip(false);

      chart.source(texts);

      // 将词云坐标系调整为G2的坐标系
      chart.coord().reflect();

      chart
        .point()
        .position('x*y')
        .color('text')
        .size('size', size => size)
        .shape('cloud')
        .style({
          fontStyle: texts[0].style,
          fontFamily: texts[0].font,
          fontWeight: texts[0].weight,
        });

      chart.render();
    });
  }

  render() {
    return (
      <div ref={n => (this.root = n)} style={{ width: '100%' }}>
        <div ref={n => (this.node = n)} />
      </div>
    );
  }
}

export default TagCloud;

