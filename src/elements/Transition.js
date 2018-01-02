import Pixel8Element from './Pixel8Element'
import easing from '../easing'

export default class Transition extends Pixel8Element {
  static defaultProps = {
    frames: 8,
    delay: 0,
    ease: x => x,
    use: (from, to, t) => {
      const next = { ...to }
      // default transition props whitelist
      const keys = ['x', 'y', 'width', 'height', 'radius', 'borderRadius']
      for (const k of keys) {
        const hasProp = k in to
        const hasDiff = from[k] !== to[k]
        if (!hasProp || !hasDiff) continue
        next[k] = from[k] + Math.round((to[k] - from[k]) * t)
      }
      return next
    },
  }
  init() {
    this.setState({
      tick: 0,
      wait: this.props.delay,
      next: new WeakMap(),
      prev: new WeakMap(),
    })
  }
  draw(f = x => x) {
    const { next } = this.state
    // only draw children
    for (const child of this.children) {
      child.draw(x => {
        const props = next.get(child) || x
        return f(props)
      })
    }
  }
  update() {
    const { state } = this
    for (const child of this.children) {
      const { props } = child
      const prev = state.prev.get(child) || props
      const next = state.next.get(child) || props
      const same = Object.keys(next).every(k => next[k] === props[k])
      if (same) {
        if (state.tick !== 0 && this.props.onTransitionEnd) {
          this.props.onTransitionEnd()
        }
        // already transitioned
        this.setState({
          tick: 0,
          wait: this.props.delay,
        })
        state.prev.set(child, props)
        state.next.set(child, props)
      } else if (state.wait) {
        // handle delay
        state.wait--
      } else {
        // transition!
        state.tick++
        const { ease, frames, use } = this.props
        const f = 'function' === typeof ease ? ease : easing[ease]
        // linear progress
        const t0 = state.tick / (frames - 1)
        // eased progress
        const t1 = f(t0)
        // calculate transitions
        const nextProps = use(prev, props, t1)
        // set next props
        state.next.set(child, nextProps)
      }
      // update child
      child.update()
    }
  }
}
