/* eslint-disable import/no-extraneous-dependencies */
import generate from '@ant-design/colors/lib/generate';
import client from 'webpack-theme-color-replacer/client';

export default {
  getAntdSerials(color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10);
    });
    const colorPalettes = generate(color);
    return lightens.concat(colorPalettes);
  },
  changeColor(newColor) {
    const options = {
      newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
    };
    return client.changer.changeColor(options, Promise);
  },
};
