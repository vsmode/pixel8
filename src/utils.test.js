import { clickToCoords } from './utils'

describe('clickToCoords', () => {
  const getNotScaledCoords = (clientX, clientY, rectWidth, rectHeight, scale) =>
    getCoords(clientX, clientY, rectWidth, rectHeight, scale, rectWidth, rectHeight)

  const getCoords = (clientX, clientY, rectWidth, rectHeight, scale, maxWidth, maxHeight) => {
    const e = {
      clientX,
      clientY,
      target: {
        getBoundingClientRect: () => ({ left: 0, top:0, width: rectWidth, height: rectHeight }),
      },
    }
    return clickToCoords(e, scale, maxWidth, maxHeight)
  }

  it('get top left', () => {
    const { x, y } = getNotScaledCoords(0, 0, 100, 100, 1)

    expect(x).toBe(0)
    expect(y).toBe(0)
  })

  it('get bottom right', () => {
    const { x, y } = getNotScaledCoords(199, 199, 200, 200, 10)

    expect(x).toBe(19)
    expect(y).toBe(19)
  })

  it('get adjacent left', () => {
    const { x, y } = getNotScaledCoords(9, 0, 100, 100, 10)

    expect(x).toBe(0)
    expect(y).toBe(0)
  })

  it('get adjacent right', () => {
    const { x, y } = getNotScaledCoords(10, 0, 100, 100, 10)

    expect(x).toBe(1)
    expect(y).toBe(0)
  })

  it('get with scaled rect', () => {
    const { x: x1 , y: y1 } = getCoords(349, 2, 350, 1050, 10, 100, 300)
    expect(x1).toBe(9)
    expect(y1).toBe(0)

    const { x: x2 , y: y2 } = getCoords(182, 211, 200, 300, 10, 100, 300)
    expect(x2).toBe(9)
    expect(y2).toBe(21)

    const { x: x3 , y: y3 } = getCoords(44, 211, 50, 300, 10, 100, 300)
    expect(x3).toBe(8)
    expect(y3).toBe(21)
  })
})
