import Pixel8Element from './Pixel8Element'
import { drawUint32 } from '../utils'

export default class Sprite extends Pixel8Element {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    index: 0,
  }
  draw(f = x => x) {
    const { x, y, width, height, index, map, source } = f(this.props)
    const { pixels, hitmap, imageData } = this.root
    const size = width * height
    const data = new Uint32Array(
      (source || new ImageData(width, height)).data.buffer,
      index * size * Uint32Array.BYTES_PER_ELEMENT,
      size,
    )
    drawUint32({
      id: this.id,
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(width),
      h: Math.round(height),
      data: map
        // map uint32 pixels
        ? data.map(map)
        // or pass in as-is
        : data,
      pixels,
      hitmap,
      imageData,
    })
  }
}
