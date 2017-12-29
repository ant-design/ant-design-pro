import React, { PureComponent } from 'react';
import classNames from 'classnames';
import G2 from 'g2';
import Cloud from 'g-cloud';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styles from './index.less';

/* eslint no-underscore-dangle: 0 */
/* eslint no-param-reassign: 0 */

const imgUrl = 'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png';

class TagCloud extends PureComponent {
  componentDidMount() {
    this.initTagCloud();
    this.renderChart();

    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.renderChart(nextProps.data);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    this.renderChart.cancel();
  }

  resize = () => {
    this.renderChart();
  }

  initTagCloud = () => {
    const { Util, Shape } = G2;

    function getTextAttrs(cfg) {
      const textAttrs = Util.mix(true, {}, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.size,
        rotate: cfg.origin._origin.rotate,
        // rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fill: cfg.color,
        textBaseline: 'Alphabetic',
      }, cfg.style);
      return textAttrs;
    }

    // Register a point with a word shape
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

  saveRootRef = (node) => {
    this.root = node;
  }

  saveNodeRef = (node) => {
    this.node = node;
  }

  @Bind()
  @Debounce(500)
  renderChart(newData) {
    const data = newData || this.props.data;
    if (!data || data.length < 1) {
      return;
    }

    const colors = ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#9AE65C'];

    const height = this.props.height * 4;
    let width = 0;
    if (this.root) {
      width = this.root.offsetWidth * 4;
    }

    data.sort((a, b) => b.value - a.value);

    const max = data[0].value;
    const min = data[data.length - 1].value;

    // Constructs a word cloud layout object
    const layout = new Cloud({
      words: data,
      width,
      height,

      rotate: () => 0,

      // Set the text size configuration function(The default is a random size of 12-24px)
      size: words => (((words.value - min) / (max - min)) * 50) + 30,

      // Set the text content
      text: words => words.name,
    });

    layout.image(imgUrl, (imageCloud) => {
      // clean
      if (this.node) {
        this.node.innerHTML = '';
      }

      // Execute the word cloud layout function and call G2
      // to draw the result in the callback function
      imageCloud.exec((texts) => {
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

        // The word cloud coordinate system is adjusted to the G2 coordinate system
        chart.coord().reflect();

        chart
          .point()
          .position('x*y')
          .color('text', colors)
          .size('size', size => size)
          .shape('cloud')
          .style({
            fontStyle: texts[0].style,
            fontFamily: texts[0].font,
            fontWeight: texts[0].weight,
          });

        chart.render();
      });
    });
  }

  render() {
    return (
      <div
        className={classNames(styles.tagCloud, this.props.className)}
        ref={this.saveRootRef}
        style={{ width: '100%' }}
      >
        <div ref={this.saveNodeRef} style={{ height: this.props.height }} />
      </div>
    );
  }
}

export default TagCloud;
