Let's create some 1-bit art:

```js
<div>
  {/*
    * 1-bit smiley
    */}
  <Stage
    width={8}
    height={8}
    scale={8}
    fps={0}
    gridColor="#f4f4f4"
    background="#fff">
    <pixel x={2} y={0} fill="#000" />
    <pixel x={5} y={0} fill="#000" />
    <pixel x={2} y={1} fill="#000" />
    <pixel x={5} y={1} fill="#000" />
    <pixel x={2} y={2} fill="#000" />
    <pixel x={5} y={2} fill="#000" />
    <pixel x={1} y={4} fill="#000" />
    <pixel x={6} y={4} fill="#000" />
    <pixel x={2} y={5} fill="#000" />
    <pixel x={3} y={5} fill="#000" />
    <pixel x={4} y={5} fill="#000" />
    <pixel x={5} y={5} fill="#000" />
    <pixel x={3} y={6} fill="#000" />
    <pixel x={4} y={6} fill="#000" />
  </Stage>
  {/*
    * 1-bit heart
    */}
  <Stage
    width={8}
    height={8}
    scale={8}
    fps={0}
    gridColor="#f4f4f4"
    background="#fff">
    <pixel x={1} y={1} fill="#000" />
    <pixel x={2} y={1} fill="#000" />
    <pixel x={5} y={1} fill="#000" />
    <pixel x={6} y={1} fill="#000" />
    <pixel x={0} y={2} fill="#000" />
    <pixel x={1} y={2} fill="#000" />
    <pixel x={2} y={2} fill="#000" />
    <pixel x={3} y={2} fill="#000" />
    <pixel x={4} y={2} fill="#000" />
    <pixel x={5} y={2} fill="#000" />
    <pixel x={6} y={2} fill="#000" />
    <pixel x={7} y={2} fill="#000" />
    <pixel x={1} y={3} fill="#000" />
    <pixel x={2} y={3} fill="#000" />
    <pixel x={3} y={3} fill="#000" />
    <pixel x={4} y={3} fill="#000" />
    <pixel x={5} y={3} fill="#000" />
    <pixel x={6} y={3} fill="#000" />
    <pixel x={2} y={4} fill="#000" />
    <pixel x={3} y={4} fill="#000" />
    <pixel x={4} y={4} fill="#000" />
    <pixel x={5} y={4} fill="#000" />
    <pixel x={3} y={5} fill="#000" />
    <pixel x={4} y={5} fill="#000" />
  </Stage>
  {/*
    * 1-bit sword
    */}
  <Stage
    width={8}
    height={8}
    scale={8}
    fps={0}
    gridColor="#f4f4f4"
    background="#fff">
    <pixel x={6} y={0} fill="#000" />
    <pixel x={7} y={0} fill="#000" />
    <pixel x={5} y={1} fill="#000" />
    <pixel x={6} y={1} fill="#000" />
    <pixel x={7} y={1} fill="#000" />
    <pixel x={2} y={2} fill="#000" />
    <pixel x={4} y={2} fill="#000" />
    <pixel x={5} y={2} fill="#000" />
    <pixel x={6} y={2} fill="#000" />
    <pixel x={2} y={3} fill="#000" />
    <pixel x={3} y={3} fill="#000" />
    <pixel x={5} y={3} fill="#000" />
    <pixel x={3} y={4} fill="#000" />
    <pixel x={4} y={4} fill="#000" />
    <pixel x={2} y={5} fill="#000" />
    <pixel x={4} y={5} fill="#000" />
    <pixel x={5} y={5} fill="#000" />
    <pixel x={1} y={6} fill="#000" />
  </Stage>
</div>
```

Looking good! Hand-coding those pixels was pretty exhausting. How about we map over the pixels instead and do a cool time-lapse thing to spice it up a bit?

```js
initialState = {
  pixels: [
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
    { x: 7, y: 1 },
    { x: 2, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 5, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 4 },
    { x: 2, y: 5 },
    { x: 4, y: 5 },
    { x: 5, y: 5 },
    { x: 1, y: 6 },
  ],
  to: 0
};
<Stage
  width={8}
  height={8}
  scale={8}
  fps={10}
  gridColor="#f4f4f4"
  background="#fff"
  onTick={() => {
    setState({ to: (state.to + 1) % state.pixels.length + 1 })
  }}>
  {state.pixels.slice(0, state.to).map(({ x, y }, i) =>
    <pixel key={i} x={x} y={y} fill="#000" />
  )}
</Stage>
```

<hr />