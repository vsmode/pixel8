import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<animation>`
 */
export default class animation extends React.Component {
  static propTypes = {
    /**
     * the animation function
     * `(frame: number, props: Props) => Props`
     */
    use: PropTypes.func.isRequired,
    /** frames per loop (duration) */
    frames: PropTypes.number,
    /** number of frames to delay before starting each loop */
    delay: PropTypes.number,
    /** number of times to run animation loop (iteration count) */
    loops: PropTypes.number,
    /** if `true`, runs animation loop in reverse every other loop */
    alternate: PropTypes.bool,
    /** easing function (linear by default)
     * 
     * you may provide a timing function `(t => t)` or
     * 
     * the name of one of the built-in easing functions:
     * 
     * `linear`
     * `easeInQuad` `easeOutQuad` `easeInOutQuad`
     * `easeInCubic` `easeOutCubic` `easeInOutCubic`
     * `easeInQuart` `easeOutQuart` `easeInOutQuart`
     * `easeInQuint` `easeOutQuint` `easeInOutQuint`
     * 
     * <br />
     */
    ease: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }
  static defaultProps = {
    frames: 8,
    delay: 0,
    loops: Infinity,
    alternate: true,
    ease: t => t,
  }
}
