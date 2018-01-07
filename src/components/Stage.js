import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AutoScale from 'react-auto-scale'
import createRenderer from '../renderer'
import createElement from '../createElement'
const { render, unmount } = createRenderer(createElement)

const StageBackground = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ bgColor }) => bgColor};
  ${({ gridType, gridColor, gridSize }) => {
    if (!gridType || gridType === 'none') return ''
    if (gridType === 'dotted')
      return `
background-position: 0 0;
background-image:
  url('data:image/svg+xml;utf8,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${gridSize}"
      height="${gridSize}">
      <rect
        x="0"
        y="0"
        width="1"
        height="1"
        fill="${gridColor}"></rect>
    </svg>');`.replace(/\n/g, ' ')
    if (gridType === 'checkered')
      return `
background-position: 0 0;
background-image:
  url('data:image/svg+xml;utf8,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="${gridSize * 2}"
      height="${gridSize * 2}">
      <rect
        x="0"
        y="0"
        width="${gridSize}"
        height="${gridSize}"
        fill="${gridColor}"></rect>
      <rect
        x="${gridSize - 1}"
        y="${gridSize - 1}"
        width="${gridSize}"
        height="${gridSize}"
        fill="${gridColor}"></rect>
    </svg>');`.replace(/\n/g, ' ')
  }};
`

/**
 * ## `<Stage>`
 * The magical gateway into the world of pixel awesomeness (づ￣ ³￣)づ
 */
export default class Stage extends Component {
  static propTypes = {
    /** Stage width in pixels */
    width: PropTypes.number,
    /** Stage height in pixels */
    height: PropTypes.number,
    /** Stage scale. Basically, the zoom level */
    scale: PropTypes.number,
    /** Stage background color */
    background: PropTypes.string,
    /** Distance between grid dots on the stage. If `0`, then no dots appear */
    gridSize: PropTypes.number,
    /** Stage grid color */
    gridColor: PropTypes.string,
    /** The grid style */
    gridType: PropTypes.oneOf(['checkered', 'dotted']),
    /** How often to redraw the stage (frames per second) */
    fps: PropTypes.number,
    /** Called once after initialization, before the first draw/tick
     * 
     * `function onInit(stage: pixel8.Stage): void` */
    onInit: PropTypes.func,
    /** Called every tick (frame)
     * 
     * `function onTick(stage: pixel8.Stage): void` */
    onTick: PropTypes.func,
    /** Called right after the stage pixel buffer gets redrawn
     * 
     * `function onDraw(stage: pixel8.Stage): void` */
    onDraw: PropTypes.func,
  }
  static defaultProps = {
    width: 128,
    height: 128,
    scale: 1,
    background: 'transparent',
    gridSize: 2, // scaled pixels
    gridType: 'checkered',
    gridColor: 'transparent',
    fps: 0,
    onInit: () => {},
    onTick: () => {},
    onDraw: () => {},
    onClick: () => {},
  }
  tick = 0
  children = new Set()
  childMap = new Map()
  appendChild(child) {
    this.children.add(child)
    this.childMap.set(child.id, child)
  }
  removeChild(child) {
    this.children.delete(child)
    this.childMap.delete(child.id)
  }
  init() {
    const { width, height } = this.props
    const size = width * height * 4
    this.ctx = this.canvas.getContext('2d')
    this.ctx.globalAlpha = 0
    // visible pixels
    this.pixelBuf = new ArrayBuffer(size)
    this.pixels = new Uint32Array(this.pixelBuf)
    // collision pixels
    this.hitBuf = new ArrayBuffer(size)
    this.hitmap = new Uint32Array(this.hitBuf)
    // create ImageData
    this.imageData = new ImageData(
      new Uint8ClampedArray(this.pixelBuf),
      width,
      height,
    )
    // draw + update loop
    this.timer = requestInterval(() => {
      this.props.onTick(this)
      this.tick++
      this.draw()
    }, 1 / this.props.fps * 1000)
    // onInit() callback
    this.props.onInit(this)
  }
  // utils methods
  getPixel = (x, y) => this.pixels[y * this.props.width + x]
  getChild = (x, y) => this.childMap.get(this.hitmap[y * this.props.width + x])
  componentDidMount() {
    this.init()
    render(this)
    this.draw()
  }
  componentWillUnmount() {
    cancelInterval(this.timer)
    unmount(this)
  }
  componentDidUpdate() {
    render(this)
  }
  draw() {
    // clear pixels and hitmap
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i] = this.hitmap[i] = 0
    }
    // update pixels
    for (const child of this.children) {
      child.draw()
    }
    // draw pixels to the canvas
    this.ctx.putImageData(this.imageData, 0, 0)
    this.props.onDraw(this)
  }
  render() {
    const {
      fps,
      children,
      background,
      gridType,
      gridSize,
      gridColor,
      palette,
      width,
      height,
      scale,
      onInit,
      onDraw,
      onTick,
      onClick,
      ...props
    } = this.props
    return (
      <div
        style={{
          width: '100%',
          maxWidth: width * scale,
          display: 'inline-block',
        }}
      >
        <AutoScale
          maxWidth={width * scale}
          maxHeight={height * scale}
          maxScale={1}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
              width: width * scale,
              height: height * scale,
            }}
          >
            <StageBackground
              bgColor={background}
              gridType={gridType}
              gridColor={gridColor}
              gridSize={scale * gridSize}
            />
            <canvas
              ref={ref => (this.canvas = ref)}
              width={width}
              height={height}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                imageRendering: 'pixelated',
                transform: `scale(${scale})`,
                transformOrigin: '0 0',
                outline: 'none',
              }}
              onClick={e => {
                e.persist()
                onClick(e)
                const rect = e.target.getBoundingClientRect()
                const x = Math.floor((e.clientX - rect.left) / scale)
                const y = Math.floor((e.clientY - rect.top) / scale)
                const child = this.getChild(x, y)
                if (child && child.props.onClick) {
                  child.props.onClick(e)
                }
              }}
              {...props}
            />
          </div>
        </AutoScale>
      </div>
    )
  }
}

export const requestInterval = (cb, ms) => {
  const self = {}
  let start = performance.now()
  const updateCancel = x => {
    cancelInterval.intervals.set(self, x)
  }
  const next = () => {
    if (performance.now() - start >= ms) {
      start += ms
      cb()
    }
    updateCancel(requestAnimationFrame(next))
  }
  updateCancel(requestAnimationFrame(next))
  return self
}
export const cancelInterval = (() => {
  const cancelInterval = self => {
    const x = cancelInterval.intervals.get(self)
    cancelAnimationFrame(x)
  }
  cancelInterval.intervals = new WeakMap()
  return cancelInterval
})()
