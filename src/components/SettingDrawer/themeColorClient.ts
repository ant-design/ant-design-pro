// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import client from 'webpack-theme-color-replacer/client';
import generate from '@ant-design/colors/lib/generate';

export default {
  getAntdSerials(color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill(0).map((_, i) => client.varyColor.lighten(color, i / 10));
    const colorPalettes = generate(color);
    return lightens.concat(colorPalettes);
  },
  changeColor(newColor: string) {
    const options = {
      newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
      changeUrl(cssUrl) {
        return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
      },
    };
    return client.changer.changeColor(options, Promise);
  },
};
