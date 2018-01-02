import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<text>`
 */
export default class text extends React.Component {
  static propTypes = {
    /** x coordinate */
    x: PropTypes.number,
    /** y coordinate */
    y: PropTypes.number,
    /** width */
    width: PropTypes.number.isRequired,
    /** height */
    height: PropTypes.number.isRequired,
    /** text */
    text: PropTypes.string,
    /** line-Height (leading)*/
    lineHeight: PropTypes.number,
    /** yOffset. Useful for scrolling */
    yOffset: PropTypes.number,
    /** color represented by a
     * - 32-bit unsigned integer (default `0` === transparent)
     * - hex string
     * - rgb/rgba string
     */
    fill: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** object containing required font information: */
    font: PropTypes.shape({
      /** width of each char */
      width: PropTypes.number,
      /** height of each char */
      height: PropTypes.number,
      /** tile index of each char */
      charmap: PropTypes.objectOf(PropTypes.number),
      /** font bits (lots of 1s and 0s) */
      data: PropTypes.arrayOf(PropTypes.number),
    }),
    /** click handler (transparent pixels are ignored) */
    onClick: PropTypes.func,
  }
}
