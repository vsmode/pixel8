```js
<Stage
  width={64}
  height={64}
  scale={8}
  fps={0}
  gridColor="#f4f4f4"
  background="#fff">
  <circ
    x={0}
    y={0}
    radius={4}
    fill="rgba(29, 43, 83, 1)"
  />
  <circ
    x={(64 / 2) - 8}
    y={(64 / 2) - 8}
    radius={8}
    fill="rgba(0, 228, 54, 1)"
  />
  {/* face made with nested circles */}
  <circ
    x={36}
    y={4}
    radius={12}
    fill="rgba(255, 163, 0, 1)">
    {/* ears */}
    <circ
      x={-4}
      y={-4}
      radius={6}
      fill="rgba(255, 163, 0, 1)"
    />
    <circ
      x={-2}
      y={-2}
      radius={4}
      fill="rgba(255, 204, 170, 1)"
    />
    <circ
      x={16}
      y={-4}
      radius={6}
      fill="rgba(255, 163, 0, 1)"
    />
    <circ
      x={18}
      y={-2}
      radius={4}
      fill="rgba(255, 204, 170, 1)"
    />
    {/* eyes */}
    <circ
      x={4}
      y={6}
      radius={4}
      fill="rgba(255, 241, 232, 1)"
    />
    <circ
      x={12}
      y={6}
      radius={4}
      fill="rgba(255, 241, 232, 1)"
    />
    <circ
      x={4}
      y={6}
      radius={2}
      fill="rgba(29, 43, 83, 1)"
    />
    <circ
      x={12}
      y={6}
      radius={2}
      fill="rgba(29, 43, 83, 1)"
    />
    {/* nose */}
    <circ
      x={10}
      y={11}
      radius={2}
      fill="rgba(0, 0, 0, 1)"
    />
    {/* mouth */}
    <circ
      x={9}
      y={16}
      radius={3}
      fill="rgba(126, 37, 83, 1)"
    />
  </circ>
</Stage>
```

<hr />