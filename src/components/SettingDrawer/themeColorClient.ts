// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import client from 'webpack-theme-color-replacer/client';
import generate from '@ant-design/colors/lib/generate';

export default {
  getAntdSerials(color: string) {
    // 淡化（即less的tint）
    let lightens = new Array(9).fill(0);
    lightens = lightens.map((_, i) => client.varyColor.lighten(color, i / 10));
    const colorPalettes = generate(color);
    return lightens.concat(colorPalettes);
  },
  changeColor(newColor: string) {
    const options = {
      // new colors array, one-to-one corresponde with `matchColors`
      newColors: this.getAntdSerials(newColor),
      changeUrl(cssUrl: string) {
        // while router is not `hash` mode, it needs absolute path
        return `/${cssUrl}`;
      },
    };
    return client.changer.changeColor(options, Promise);
  },
};
