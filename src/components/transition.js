import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<transition>`
 */
export default class transition extends React.Component {
  static propTypes = {
    /**
     * the transition function
     * `(from: Props, to: Props, t: number) => Props`
     */
    use: PropTypes.func,
    /** frames per transition (duration) */
    frames: PropTypes.number,
    /** number of frames to delay before starting transition */
    delay: PropTypes.number,
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
    /** called when a transition completes */
    onTransitionEnd: PropTypes.func,
  }
  static defaultProps = {
    frames: 8,
    delay: 0,
    ease: t => t,
  }
}
