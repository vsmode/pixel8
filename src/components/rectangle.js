import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<rect>`
 */
export default class rectangle extends React.Component {
  static propTypes = {
    /** x position */
    x: PropTypes.number,
    /** y position */
    y: PropTypes.number,
    /** width */
    width: PropTypes.number,
    /** height */
    height: PropTypes.number,
    /** border radius */
    borderRadius: PropTypes.number,
    /** color represented by a
     * - 32-bit unsigned integer (default `0` === transparent)
     * - hex string
     * - rgb/rgba string
     */
    fill: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    /** click handler (transparent pixels are ignored) */
    onClick: PropTypes.func,
  }
  static defaultProps = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    borderRadius: 0,
    fill: 0,
  }
}
