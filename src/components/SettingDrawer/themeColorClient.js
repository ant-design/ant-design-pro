const client = require('webpack-theme-color-replacer/client')

export default {
  primaryColor: '#1890ff',
  getAntdSerials (color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10)
    })
    // 此处为了简化，采用了darken。实际按color.less需求可以引入tinycolor, colorPalette变换得到颜色值
    const darkens = new Array(6).fill().map((t, i) => {
      return client.varyColor.darken(color, i / 10)
    })
    return lightens.concat(darkens)
  },
  changeColor (newColor) {
    const lastColor = this.lastColor || this.primaryColor
    const options = {
      cssUrl: '/css/theme-colors.css', // hash模式下用相对路径
      oldColors: this.getAntdSerials(lastColor), // current colors array. The same as `matchColors`
      newColors: this.getAntdSerials(newColor || this.primaryColor) // new colors array, one-to-one corresponde with `oldColors`
    }
    const promise = client.changer.changeColor(options)
    this.lastColor = lastColor
    return promise
  }
}
