import Rectangle from './Rectangle'
import Transition from './Transition'

class ImageData {
  constructor(w, h) {
    this.width = w
    this.height = h
    this.data = new Uint8ClampedArray(new ArrayBuffer(w * h * 4))
  }
}

const createRoot = (width, height) => {
  const imageData = new ImageData(width, height)
  const pixels = new Uint32Array(imageData.data.buffer)
  const hitmap = new Uint32Array(new ArrayBuffer(imageData.data.length))
  const children = new Set()
  const childMap = new Map()
  const registerChild = () => {}
  const unregisterChild = () => {}
  const appendChild = child => {
    children.add(child)
    childMap.set(child.id, child)
  }
  const removeChild = child => {
    children.delete(child)
    childMap.delete(child.id)
  }
  const draw = () => {
    for (let i = 0; i < pixels.length; i++) {
      pixels[i] = hitmap[i] = 0
    }
    for (const child of children) {
      child.draw()
    }
  }
  const getPixel = (x, y) => pixels[y * width + x]
  const getChild = (x, y) => childMap.get(hitmap[y * width + x])
  return {
    imageData,
    pixels,
    hitmap,
    children,
    childMap,
    appendChild,
    removeChild,
    registerChild,
    unregisterChild,
    draw,
    getPixel,
    getChild,
  }
}

const pixelsToString = root => {
  let px = []
  let i = 0
  for (let y = 0; y < root.imageData.height; y++) {
    px.push([])
    for (let x = 0; x < root.imageData.width; x++) {
      px[y].push(root.pixels[i])
      i++
    }
  }
  return '\n' + px.map(x => x.join(' ')).join('\n')
}

it('[0, 0] 1x1', () => {
  const props = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    fill: 1,
  }
  const children = null
  const root = createRoot(8, 8)
  const rect = new Rectangle(props, null, root)
  root.appendChild(rect)
  root.draw()
  expect(root.getPixel(0, 0)).toBe(1)
  expect(root.getChild(0, 0)).toBe(rect)
  expect(pixelsToString(root)).toMatchSnapshot()
})

it('elements nested in transition', () => {
  const props = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    fill: 1,
  }
  const children = null
  const root = createRoot(8, 8)
  const tran = new Transition(
    {
      frames: 4,
    },
    null,
    root,
  )
  const rect1 = new Rectangle(
    {
      x: 0,
      y: 0,
      width: 4,
      height: 4,
      fill: 1,
    },
    null,
    root,
  )
  const rect2 = new Rectangle(
    {
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      fill: 2,
    },
    null,
    root,
  )
  root.appendChild(tran)
  tran.appendChild(rect1)
  rect1.appendChild(rect2)
  root.draw()
  expect(pixelsToString(root)).toMatchSnapshot()
  rect1.setProps({ x: 4 })
  for (let i = 0; i < 4; i++) {
    root.draw()
    expect(pixelsToString(root)).toMatchSnapshot()
  }
})
