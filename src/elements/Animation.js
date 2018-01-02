import Pixel8Element from './Pixel8Element'
import * as easing from '../easing'

export default class Animation extends Pixel8Element {
  static defaultProps = {
    frames: 8,
    delay: 0,
    loops: Infinity,
    alternate: true,
    ease: x => x,
  }
  init() {
    this.setState({
      iter: 0,
      tick: 0,
      n: 1,
      t: 0,
      wait: this.props.delay,
    })
  }
  draw(f = x => x) {
    // only draw children
    for (const child of this.children) {
      child.draw(x => this.mapChildProps(f(x)))
    }
  }
  update() {
    const { delay, frames, alternate, loops } = this.props
    // end animation once iteration count is reached
    if (this.state.iter === loops * (frames - 1)) {
      this.state.wait = Infinity
    }
    // delay animation loop
    if (this.state.wait > 0) {
      this.state.wait--
    } else {
      // increment the iteration count
      this.state.iter++
      // update tick counter (forward)
      if (!alternate) {
        this.state.tick = (this.state.tick + 1) % frames
        if (this.state.tick === 0) {
          this.state.wait = delay ? delay - 1 : 0
        }
      } else {
        // update tick counter (alternate)
        this.state.tick = this.state.tick + this.state.n
        if (this.state.tick === frames) {
          this.state.n *= -1
          this.state.tick += this.state.n * (delay ? 1 : 2)
          this.state.wait = delay ? delay - 1 : 0
        }
        if (this.state.tick === 0) {
          this.state.n *= -1
          this.state.wait = delay
        }
      }
    }
    // update children
    for (const child of this.children) child.update()
  }
  mapChildProps(childProps) {
    const { ease, foo, frames, use } = this.props
    const f = 'function' === typeof ease ? ease : easing[ease]
    if ('function' !== typeof f)
      throw new Error(`<Animation> received invalid easing function: ${ease}`)
    // linear progress
    const t0 = this.state.tick / (frames - 1)
    // eased progress
    const t1 = f(t0)
    // tick based on eased progress
    const t = Math.round(t1 * (frames - 1))
    return use(t, childProps)
  }
}
