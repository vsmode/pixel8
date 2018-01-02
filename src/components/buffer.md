If you can't find a good way to accomplish what you're attempting to do with the other built-in components, `<buffer>` might be what you're looking for.

```js
const { toUint32 } = pixel8.utils;
<Stage
  width={64}
  height={32}
  scale={8}
  fps={10}
  gridColor="#f4f4f4">
  <buffer
    name="foo"
    x={0}
    y={0}
    width={8}
    height={8}
    data={[
      // smiley face
      0, 2, 2, 2, 2, 2, 2, 0,
      2, 2, 1, 2, 2, 1, 2, 2,
      2, 2, 1, 2, 2, 1, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2,
      2, 1, 2, 2, 2, 2, 1, 2,
      2, 2, 1, 1, 1, 1, 2, 2,
      2, 2, 2, 1, 1, 2, 2, 2,
      0, 2, 2, 2, 2, 2, 2, 0,
    ].map(compose(
      pixel8.transforms.palette([
        [1, 'rgb(95, 87, 79)'],
        [2, 'rgb(255, 236, 39)'],
      ]),
      pixel8.transforms.crop({
        x: 1,
        y: 1,
        width: 6,
        height: 5,
        originalWidth: 8,
        originalHeight: 8,
      })
    ))}
  />
  <buffer
    x={16}
    y={0}
    width={5}
    height={5}
    data={[
      // down arrow
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      1, 1, 1, 1, 1,
      0, 2, 2, 2, 0,
      0, 0, 3, 0, 0,
    ].map(byte => {
      // can be used for palette swapping
      switch (byte) {
        case 1: return toUint32('rgba(0, 0, 0, 1)')
        case 2: return toUint32('rgba(0, 0, 0, .75)')
        case 3: return toUint32('rgba(0, 0, 0, .25)')
        default: return byte
      }
    })}
  />
</Stage>
```