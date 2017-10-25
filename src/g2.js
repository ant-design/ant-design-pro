// 全局 G2 设置
import G2 from 'g2';

G2.track(false);

const config = {
  ...G2.Theme,
  defaultColor: '#1089ff',
  tooltip: {
    background: {
      radius: 4,
      fill: '#000',
      fillOpacity: 0.75,
    },
  },
};

G2.Global.setTheme(config);
