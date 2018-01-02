import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<buffer>`
 * Draws an array of raw bytes to the stage
 */
export default class buffer extends React.Component {
  static propTypes = {
    /** x coordinate */
    x: PropTypes.number,
    /** y coordinate */
    y: PropTypes.number,
    /** width */
    width: PropTypes.number.isRequired,
    /** height */
    height: PropTypes.number.isRequired,
    /** TypedArray, ArrayBuffer or Array with unsigned bytes to render to the canvas */
    data: PropTypes.oneOfType([
      PropTypes.instanceOf(Array),
      PropTypes.instanceOf(ArrayBuffer),
      PropTypes.instanceOf(Uint32Array),
      PropTypes.instanceOf(Uint16Array),
      PropTypes.instanceOf(Uint8Array),
      PropTypes.instanceOf(Uint8ClampedArray),
    ]),
    /** click handler (transparent pixels are ignored) */
    onClick: PropTypes.func,
  }
}
