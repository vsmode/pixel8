import React from 'react'
import PropTypes from 'prop-types'

/**
 * ## `<pixel>`
 */
export default class pixel extends React.Component {
  static propTypes = {
    /** x position */
    x: PropTypes.number,
    /** y position */
    y: PropTypes.number,
    /** color represented by a
     * - 32-bit unsigned integer (default `0` === transparent)
     * - hex string
     * - rgb/rgba string
     **/
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
    fill: 0,
  }
}
