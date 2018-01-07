import Pixel8Element from './Pixel8Element'
import { drawRect, toUint32 } from '../utils'

export default class Rectangle extends Pixel8Element {
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: 0,
    borderRadius: 0,
  }
  draw(f = x => x) {
    this.computedProps = f(this.props)
    const { x, y, width, height, fill, borderRadius } = this.computedProps
    const { pixels, hitmap, imageData } = this.root
    drawRect({
      id: this.id,
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(width),
      h: Math.round(height),
      fill: toUint32(fill),
      radius: Math.round(borderRadius),
      pixels,
      hitmap,
      imageData,
    })
    for (const child of this.children) {
      child.draw(x => this.mapChildProps(f(x)))
    }
  }
}
