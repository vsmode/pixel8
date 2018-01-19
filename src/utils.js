export const drawRect = ({
  id,
  pixels,
  hitmap,
  imageData,
  x,
  y,
  w,
  h,
  fill,
  radius,
}) => {
  const { width, height } = imageData
  // skip transparent fills
  if (fill === 0) return
  // calculate coordinates to skip due to border-radius
  // secret bonus: also useful for drawing circles
  const skips = calcBorderRadiusSkips(w, h, radius)
  for (let row = 0; row < h; row++) {
    const _y = row + y
    if (_y < 0 || _y >= height) continue // off-stage
    for (let col = 0; col < w; col++) {
      const _x = col + x
      if (_x < 0 || _x >= width) continue // off-stage
      // skip border-radius coords
      if (skips[row]) {
        const s = skips[row]
        if (col > s[0] || col < s[1]) continue
      }
      // pixel index
      const idx = _y * width + _x
      // write visible pixels to uint32 array
      pixels[idx] = fill
      // write id to hitmap
      hitmap[idx] = id
    }
  }
}

export const drawUint32 = ({
  id,
  pixels,
  hitmap,
  imageData,
  x,
  y,
  w,
  h,
  data,
}) => {
  const { width, height } = imageData
  for (let i = 0; i < h; i++) {
    const _y = y + i
    if (_y < 0 || _y >= height) continue
    for (let j = 0; j < w; j++) {
      const _x = x + j
      if (_x < 0 || _x >= width) continue
      // source index
      const idx0 = i * w + j
      // dest index
      const idx1 = _y * width + _x
      // uint32 color
      const color = data[idx0]
      if (color === 0) continue
      pixels[idx1] = color
      hitmap[idx1] = id
    }
  }
}

// hypotenuse, side => other side
export const chord = (a, b) => Math.sqrt(Math.pow(a, 2) + -Math.pow(b, 2)) * 2

export const calcBorderRadiusSkips = (w, h, br) => {
  let i = br
  const skips = []
  while (i) {
    const val = w + chord(br, i--) / 2 - (br + 1)
    const xs = [val, w - 1 - val]
    skips[br - (i + 1)] = xs
    skips[h - (br - i)] = xs
  }
  return skips
}

export const fromHex = hex => {
  const len = hex.length - 1
  let str = ''
  if (len === 3) {
    for (const x of hex.substr(1)) {
      // little-endian
      str = x.repeat(2) + str
      // big-endian
      // str += x.repeat(2)
    }
  } else {
    for (let i = len - 1; i > 0; i -= 2) {
      // little-endian
      str += hex[i] + hex[i + 1]
      // big-endian
      // str = hex[i] + hex[i + 1] + str
    }
  }
  str = 'ff' + str.substr(0, 6)
  return parseInt(str, 16)
}

export const fromRGBA = rgba => {
  const [red, green, blue, alpha = 1] = rgba
    .split('(')[1]
    .split(')')[0]
    .split(',')
    .map(Number)
  const a = (alpha * 255) & 0xff
  const b = blue & 0xff
  const g = green & 0xff
  const r = red & 0xff
  return toABGR(r, g, b, a)
}

export const modulo = (a, b) => a - Math.floor(a / b) * b

// for big-endian
export const toRGBA = (r, g, b, a) => (r << 24) | (g << 16) | (b << 8) | a

// for little-endian
export const toABGR = (r, g, b, a) => (a << 24) | (b << 16) | (g << 8) | r

export const toUint32 = (cache => x => {
  if (x in cache) return cache[x]
  let val = null
  if (Number.isInteger(x)) val = x
  else if ('string' === typeof x && x[0] === '#') val = fromHex(x)
  else if ('string' === typeof x && x.substring(0, 3) === 'rgb')
    val = fromRGBA(x)
  if (val === null) throw new Error(`Unsupported format: ${x}`)
  cache[x] = modulo(val, Math.pow(2, 32))
  return cache[x]
})({})

export const createContext = (w, h) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = w
  canvas.height = h
  return ctx
}

export const loadImage = path =>
  new Promise((okay, nope) => {
    const img = new Image()
    img.onload = () => okay(img)
    img.onerror = x => nope(x)
    img.src = path
  })

export const toImageData = img => {
  const ctx = createContext(img.width, img.height)
  ctx.drawImage(img, 0, 0)
  return ctx.getImageData(0, 0, img.width, img.height)
}

export const loadImageData = async path => toImageData(await loadImage(path))

export const stringToLines = (words, charWidth, boxWidth) => {
  const lines = ['']
  for (const word of words) {
    const line = lines[lines.length - 1]
    const a = line.length * charWidth
    // @TODO - support line-breaks properly
    let n = 0 // word length
    for (const char of word) {
      if (char === '\n') break
      n++
    }
    const b = n * charWidth + charWidth
    const eol = a + b > boxWidth
    let _word = eol ? '\n' + word + ' ' : word + ' '
    while (_word.length) {
      const [char] = _word
      if (char === '\n') {
        lines.push('')
      } else {
        lines[lines.length - 1] += char
      }
      _word = _word.substr(1)
    }
  }
  return lines
}

export const stringToBytes = (
  text,
  {
    boxWidth,
    boxHeight,
    fill,
    lineHeight,
    yOffset,
    font: { width, height, charmap, data },
  },
) => {
  const color = 'undefined' !== typeof fill ? toUint32(fill) : toUint32('#000')
  const words = (Array.isArray(text) ? text.join('') : text).split(/[ ]/)
  const lines = stringToLines(words, width, boxWidth)
  // remove trailing space
  if (lines[lines.length - 1] === ' ') lines[lines.length - 1].slice(0, -1)
  // create pixel array
  const bytes = new Uint32Array(boxWidth * boxHeight) // []
  // iterate lines
  for (let i = 0; i < lines.length; i++) {
    const row = lines[i]
    const y = i * lineHeight + yOffset
    const chars = [...row]
    if (y >= boxHeight) break
    if (y < -height) {
      continue
    }
    // iterate letters
    for (let j = 0; j < chars.length; j++) {
      const char = chars[j]
      const x = (j % boxWidth) * width
      const start = charmap[char] * width * height
      const end = start + width * height
      const pixels = data.slice(start, end)
      let n = 0
      pixels.forEach((px, i) => {
        const eol = i % width === width - 1
        const _y = y + n
        const _x = x + i % width
        bytes[_y * boxWidth + _x] = px ? color : px
        if (eol) n++
      })
    }
  }
  return bytes
}

export const clickToCoords = (e, scale, maxWidth, maxHeight) => {
  const rect = e.target.getBoundingClientRect()

  const scaleX = scale * (rect.width / (maxWidth))
  const scaleY = scale * (rect.height / (maxHeight))
  const x = Math.floor((e.clientX - rect.left) / scaleX)
  const y = Math.floor((e.clientY - rect.top) / scaleY)
  return { x, y }
}

export default {
  drawRect,
  drawUint32,
  chord,
  calcBorderRadiusSkips,
  fromHex,
  fromRGBA,
  toUint32,
  createContext,
  loadImage,
  toImageData,
  loadImageData,
  stringToLines,
  stringToBytes,
  clickToCoords,
}
