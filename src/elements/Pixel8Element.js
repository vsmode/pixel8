let ID = 1 // start at 1 since 0 in hitmap means no hit
export default class Pixel8Element {
  static defaultProps = {
    x: 0,
    y: 0,
  }
  constructor(props, children, root) {
    this.id = ID++
    this.props = this.mapProps(null, {
      ...this.constructor.defaultProps,
      ...props,
    })
    this.state = {}
    this.children = new Set(children)
    this.root = root
    this.init()
  }
  setState(nextState) {
    this.state = { ...this.state, ...nextState }
  }
  init() {}
  draw() {}
  update() {
    for (const child of this.children) child.update()
  }
  mapProps(props, nextProps) {
    return {
      ...props,
      ...nextProps,
    }
  }
  mapChildProps(childProps) {
    // relative positioning
    return {
      ...childProps,
      x: childProps.x + this.props.x,
      y: childProps.y + this.props.y,
    }
  }
  appendChild(child) {
    this.children.add(child)
  }
  removeChild(child) {
    this.children.delete(child)
  }
}
