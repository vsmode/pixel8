import { toUint32 } from './utils'

export const crop = ({
  x,
  y,
  width,
  height,
  originalWidth,
  originalHeight,
}) => (byte, i) => {
  if (i % originalWidth < x) return 0
  if (Math.floor(i / originalHeight) < y) return 0
  if (i % originalWidth > x + (width - 1)) return 0
  if (Math.floor(i / originalHeight) > y + (height - 1)) return 0
  return byte
}

let logged = 0
export const palette = palette => {
  const cmap = new Map(palette)
  for (const [k, v] of cmap) {
    cmap.set(toUint32(k), toUint32(v))
  }
  return byte => {
    return cmap.has(byte) ? cmap.get(byte) : byte
  }
}

export default {
  crop,
  palette,
}
