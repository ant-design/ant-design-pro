// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import client from 'webpack-theme-color-replacer/client';
import generate from '@ant-design/colors/lib/generate';

export default {
  lastColor: '#1890ff',
  primaryColor: '#1890ff',
  getAntdSerials(color: string) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill(0).map((_, i) => client.varyColor.lighten(color, i / 10));
    const colorPalettes = generate(color);
    return lightens.concat(colorPalettes);
  },
  changeColor(newColor?: string) {
    const lastColor = this.lastColor || this.primaryColor;
    const options = {
      // hash模式下用相对路径
      cssUrl: '/css/theme-colors.css',
      // current colors array. The same as `matchColors`
      oldColors: this.getAntdSerials(lastColor),
      // new colors array, one-to-one corresponde with `oldColors`
      newColors: this.getAntdSerials(newColor || this.primaryColor),
    };
    const promise = client.changer.changeColor(options, Promise);
    this.lastColor = lastColor;
    return promise;
  },
};
