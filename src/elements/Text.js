import Pixel8Element from './Pixel8Element'
import { drawUint32, stringToBytes } from '../utils'
import fonts from '../fonts'

export default class Text extends Pixel8Element {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    text: '',
    fill: 0,
    font: 'micro',
    yOffset: 0,
  }
  draw(f = x => x) {
    const { x, y, text, lineHeight, font, fill, width, height, yOffset } = f(
      this.props,
    )
    const data = stringToBytes(text, {
      lineHeight: lineHeight || font.height,
      font:
        'string' === typeof font
          ? // font is string
            fonts[font]
          : // font is object
            font,
      fill,
      boxWidth: width,
      boxHeight: height,
      yOffset,
    })
    const { pixels, hitmap, imageData } = this.root
    drawUint32({
      id: this.id,
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(width),
      h: Math.round(height),
      data,
      pixels,
      hitmap,
      imageData,
    })
  }
}
