// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-extraneous-dependencies */
import client from 'webpack-theme-color-replacer/client';
import generate from '@ant-design/colors/lib/generate';

export default {
  getAntdSerials(color: string): string[] {
    const lightCount = 9;
    const divide = 10;
    // 淡化（即less的tint）
    let lightens = new Array(lightCount).fill(0);
    lightens = lightens.map((_, i) => client.varyColor.lighten(color, i / divide));
    const colorPalettes = generate(color);
    return lightens.concat(colorPalettes);
  },
  changeColor(color?: string): Promise<void> {
    if (!color) {
      return Promise.resolve();
    }
    const options = {
      // new colors array, one-to-one corresponde with `matchColors`
      newColors: this.getAntdSerials(color),
      changeUrl(cssUrl: string): string {
        // while router is not `hash` mode, it needs absolute path
        return `/${cssUrl}`;
      },
    };
    return client.changer.changeColor(options, Promise);
  },
};
