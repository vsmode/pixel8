import Animation from './elements/Animation'
import Circle from './elements/Circle'
import PixelBuffer from './elements/PixelBuffer'
import Rectangle from './elements/Rectangle'
import Sprite from './elements/Sprite'
import Text from './elements/Text'
import Transition from './elements/Transition'

export default function createElement (type, props, root) {
  // console.log(type, props, root)
  switch (type) {
    /**
     * Shapes
     */
    case 'px':
    case 'pixel': {
      if (props.children) {
        throw new Error(
          '<pixel> cannot have children. Try using a different shape like <rect> or <circ>.',
        )
      }
      return new Rectangle({ ...props, width: 1, height: 1 }, [], root)
    }
    case 'circ':
    case 'circle': {
      return new Circle(props, [], root)
    }
    case 'rect':
    case 'rectangle': {
      return new Rectangle(props, [], root)
    }
    /**
     * Transition
     */
    case 'trans':
    case 'transition': {
      return new Transition(props, [], root)
    }
    /**
     * Animation
     */
    case 'anim':
    case 'animation': {
      return new Animation(props, [], root)
    }
    /**
     * Text
     */
    case 'text': {
      if (props.children) {
        throw new Error(
          '<text> cannot have children. Try using a different shape like <rect> or <circ>.',
        )
      }
      return new Text(props, [], root)
    }
    /**
     * Sprite
     */
    case 'sprite': {
      if (props.children) {
        throw new Error(
          '<sprite> cannot have children. Try using a different shape like <rect> or <circ>.',
        )
      }
      return new Sprite(props, [], root)
    }
    /**
     * Buffer
     */
    case 'buf':
    case 'buffer': {
      if (props.children) {
        throw new Error(
          '<buffer> cannot have children. Try using a different shape like <rect> or <circ>.',
        )
      }
      return new PixelBuffer(props, [], root)
    }
    /**
     * Not supported
     * @desc Ignore all children without a `type` property (functions, nulls, etc)
     */
    default:
      return
  }
}