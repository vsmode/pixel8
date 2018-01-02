`<sprite>` makes it simple to get a sub-sprite from a larger spritesheet. The only caveat here is that it expects the spritesheet to be the width of a single sprite -- like a filmstrip of sorts. The `index` prop will adjust the vertical offset that is rendered. Combining `<sprite>` with `<animation>`, you can quickly throw together an animated sprite from a single image. Check out the example below:

```js
initialState = { source: null };
const indexByFrame = frames => (t, props) => {
  return {
    ...props,
    index: frames[t]
  }
};
<div>
  <Stage
    width={64}
    height={16}
    scale={8}
    fps={30}
    gridColor="#f4f4f4"
    background="#fff"
    onInit={() => {
      // Load the sprite as ImageData
      pixel8.utils
        .loadImageData('/red_walking_down_1-sheet.png')
        .then(source => setState({ source }))
    }}>
    {/* first frame */}
    {state.source && (
      <sprite
        index={0}
        x={0}
        y={0}
        width={16}
        height={16}
        source={state.source}
      />
    )}
    {/* second frame */}
    {state.source && (
      <sprite
        index={1}
        x={16}
        y={0}
        width={16}
        height={16}
        source={state.source}
      />
    )}
    {/* animated */}
    {state.source && (
      <animation
        use={indexByFrame([0, 0, 0, 0, 1, 1, 1, 1])}
        frames={8}>
        <sprite
          x={32}
          y={0}
          width={16}
          height={16}
          source={state.source}
        />
      </animation>
    )}
    {/* animated + palette shifted */}
    {state.source && (
      <animation
        use={indexByFrame([
          0, 0, 0, 0, 0, 0, 0, 0,
          1, 1, 1, 1, 0, 0, 0, 0,
          1, 1, 1, 1, 1, 1, 1, 1,
          0, 0, 0, 0, 1, 1, 1, 1,
        ])}
        frames={32}>
        <sprite
          x={48}
          y={0}
          width={16}
          height={16}
          source={state.source}
          map={pixel8.transforms.palette([
            // red -> blue
            ['#d95763', '#29adff'],
            // white -> brown
            ['#ffffff', '#ab5236'],
          ])}
        />
      </animation>
    )}
  </Stage>
  <div>
  original image: <img src="/red_walking_down_1-sheet.png" />
  </div>
</div>
```