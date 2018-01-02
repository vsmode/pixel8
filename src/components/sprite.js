import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<sprite>`
 */
export default class sprite extends React.Component {
  static propTypes = {
    /** x coordinate */
    x: PropTypes.number,
    /** y coordinate */
    y: PropTypes.number,
    /** width */
    width: PropTypes.number.isRequired,
    /** height */
    height: PropTypes.number.isRequired,
    /** color represented by a
     * - 32-bit unsigned integer (default `0` === transparent)
     * - hex string
     * - rgb/rgba string
     */
    fill: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** click handler (transparent pixels are ignored) */
    onClick: PropTypes.func,
  }
}
