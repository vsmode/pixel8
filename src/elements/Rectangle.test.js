import Rectangle from './Rectangle'

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
      child.update()
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
    draw,
    getPixel,
    getChild,
  }
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
  expect(root.pixels).toMatchSnapshot()
})
