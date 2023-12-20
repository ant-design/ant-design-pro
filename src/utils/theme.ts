import { G2 } from '@ant-design/charts';
const { registerTheme } = G2;
/**
 * 渐变色
 */
//  'l(270) 0:#1e74bd 1:#3eded2';
//  'l(270) 0:#7100fe 1:#8d03f9';
//  'l(270) 0:#2643fe 1:#42a6f1';
registerTheme('custom-theme', {
  colors10: [
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
  ],
  colors20: [
    '#025DF4',
    '#DB6BCF',
    '#2498D1',
    '#BBBDE6',
    '#4045B2',
    '#21A97A',
    '#FF745A',
    '#007E99',
    '#FFA8A8',
    '#2391FF',
    '#FFC328',
    '#A0DC2C',
    '#946DFF',
    '#626681',
    '#EB4185',
    '#CD8150',
    '#36BCCB',
    '#327039',
    '#803488',
    '#83BC99',
  ],
});
registerTheme('custom-theme-retro', {
  colors10: [
    '#EC53B0',
    '#8BE8E5',
    '#A084E8',
    '#ED7B7B',
    '#F0B86E',
    '#676FA3',
    '#CDDEFF',
    '#947EC3',
    '#EEF3D2',
    '#B270A2',
  ],
});
registerTheme('custom-theme-pastel', {
  colors10: [
    '#B7D3DF',
    '#EEE0C9',
    '#EF9595',
    '#EFB495',
    '#94A684',
    '#AEC3AE',
    '#EAC7C7',
    '#A0C3D2',
    '#EAE0DA',
    '#FCF9BE',
  ],
});

registerTheme('custom-theme-cold', {
  colors10: [
    '#8BE8E5',
    '#D5FFE4',
    '#749BC2',
    '#91C8E4',
    '#87CBB9',
    '#B9EDDD',
    '#BFACE2',
    '#EBC7E6',
    '#D2DE32',
    '#A2C579',
  ],
});
registerTheme('custom-theme-popular', {
  colors10: [
    '#64CCC5',
    '#AEC3AE',
    '#FFBFBF',
    '#D8B4F8',
    '#FF6969',
    '#E8E9A1',
    '#A3DDCB',
    '#C8B6E2',
    '#92A9BD',
    '#EBFFFA',
  ],
});

registerTheme('custom-theme-dark', {
  colors10: [
    '#2480FF',
    '#48bfe3',
    '#9683EC',
    '#FFB6D9',
    '#FEFFAC',
    '#8EACCD',
    '#D7E5CA',
    '#F9F3CC',
    '#D2E0FB',
    '#40DFEF',
  ],
  colors20: [
    '#2480FF',
    '#45F0EA',
    '#9683EC',
    '#FFB6D9',
    '#FEFFAC',
    '#8EACCD',
    '#D7E5CA',
    '#F9F3CC',
    '#D2E0FB',
    '#40DFEF',
  ],
  styleSheet: {
    brandColor: '#1677ff',
    backgroundColor: 'transparent',
  },

  pieLabels: {
    style: {
      fill: '#fff',
    },
  },

  labels: {
    style: {
      fill: '#fff',
    },
    autoRotate: true,
  },
  innerLabels: {
    style: {
      fill: '#fff',
    },
    autoRotate: true,
  },
  overflowLabels: {
    style: {
      fill: '#A6A6A6',
    },
  },
  geometries: {
    interval: {
      // 适用于 column、bar 和 pie 等
      rect: {
        default: {
          style: {
            stroke: 'transparent',
          },
        },
        active: {
          style: {
            stroke: 'transparent',
          },
        },
        selected: {
          style: {
            stroke: 'transparent',
          },
        },
      },
    },
  },
  components: {
    axis: {
      common: {
        label: {
          style: {
            fill: '#fff',
          },
        },
        line: {
          style: {
            stroke: '#2066a1',
          },
        },
        grid: {
          line: {
            style: {
              stroke: '#163a5a',
            },
          },
        },
        tickLine: {
          style: { stroke: '#2066a1' },
          alignTick: true,
          length: 4,
        },
      },
      radius: {
        title: null,
        line: {
          style: {
            stroke: '#2066a1',
            lineWidth: 1,
          },
        },
        grid: {
          line: {
            type: 'circle',
            style: { stroke: '#163a5a', lineWidth: 1 },
          },
          animate: true,
        },
        tickLine: {
          style: { stroke: '#2066a1', lineWidth: 1 },
        },
      },
      circle: {
        title: null,
        grid: {
          line: {
            type: 'line',
            style: { stroke: '#163a5a', lineWidth: 1, lineDash: [0, 0] },
          },
          alignTick: true,
          animate: true,
        },
      },
    },
    legend: {
      common: {
        itemName: {
          style: {
            fill: '#fff',
          },
        },
        radio: {
          style: {
            stroke: '#fff',
            fill: 'transparent',
          },
        },
        pageNavigator: {
          marker: {
            style: {
              size: 12,
              inactiveFill: '#fff',
              inactiveOpacity: 1,
              fill: '#fff',
              opacity: 1,
            },
          },
          text: { style: { fill: '#fff', fontSize: 12 } },
        },
      },
    },
    annotation: {
      text: {
        style: {
          stroke: '#fff',
          fill: '#fff',
        },
      },
      region: {
        style: {
          fill: '#fff',
        },
      },
    },
    tooltip: {
      domStyles: {
        'g2-tooltip': {
          backgroundColor: '#131e34',
          boxShadow: '0px 2px 4px #145983',
          color: '#fff',
        },
      },
      crosshairs: {
        line: {
          style: { stroke: '#295582', lineWidth: 1 },
        },
      },
    },
    // 滚动条
    slider: {
      common: {
        padding: [8, 8, 8, 8],
        backgroundStyle: { fill: '#13161d', opacity: 0.6 },
        foregroundStyle: { fill: '#132c49', opacity: 1 },
        handlerStyle: {
          width: 10,
          height: 24,
          fill: '#145983',
          opacity: 1,
          stroke: '#2066a1',
          lineWidth: 1,
          radius: 2,
          highLightFill: '#2b9ec0',
        },
        textStyle: {
          fill: '#2a99bf',
          opacity: 0.6,
          fontSize: 12,
          lineHeight: 12,
          fontWeight: 'normal',
          stroke: null,
          lineWidth: 0,
        },
      },
    },
  },
  subColor: 'red',
});
