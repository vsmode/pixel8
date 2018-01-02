import Pixel8Element from './Pixel8Element'
import { drawUint32 } from '../utils'

export default class PixelBuffer extends Pixel8Element {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    data: new ArrayBuffer(),
  }
  draw(f = x => x) {
    const { type, x, y, width, height, data, map, name, palette } = f(
      this.props,
    )
    const { pixels, hitmap, imageData } = this.root
    drawUint32({
      id: this.id,
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(width),
      h: Math.round(height),
      data:
        data instanceof Uint32Array
          ? // Uint32Array
            data
          : Array.isArray(data)
            ? // Array
              Uint32Array.from(data, map)
            : // ArrayBuffer or TypedArray
              new Uint32Array(data.buffer || data, map),
      pixels,
      hitmap,
      imageData,
    })
  }
}
