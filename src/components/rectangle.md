```js
<Stage
  width={64}
  height={64}
  scale={8}
  fps={0}
  gridColor="#f4f4f4"
  background="#fff">
  <rect
    x={0}
    y={0}
    height={8}
    width={32}
    fill="rgba(255, 119, 168, 1)"
    borderRadius={0}
  />
  <rect
    x={48}
    y={10}
    height={8}
    width={4}
    fill="rgba(131, 118, 156, 1)"
    borderRadius={0}
  />
  {/* robot */}
  <rect
    x={(64 / 2) - 8}
    y={(64 / 2) - 8}
    height={16}
    width={16}
    fill="rgba(194, 195, 199, 1)"
    borderRadius={1}>
    {/* eyes */}
    <rect
      x={2}
      y={4}
      height={6}
      width={4}
      fill="rgba(255, 0, 77, 1)"
      borderRadius={1}
    />
    <rect
      x={10}
      y={4}
      height={6}
      width={4}
      fill="rgba(255, 0, 77, 1)"
      borderRadius={1}
    />
    {/* "ears" */}
    <rect
      x={-2}
      y={4}
      height={8}
      width={2}
      fill="rgba(95, 87, 79, 1)"
      borderRadius={0}
    />
    <rect
      x={-2}
      y={-2}
      height={8}
      width={1}
      fill="rgba(194, 1955, 199, 1)"
      borderRadius={0}
    />
    <rect
      x={16}
      y={4}
      height={8}
      width={2}
      fill="rgba(95, 87, 79, 1)"
      borderRadius={0}
    />
    <rect
      x={17}
      y={-2}
      height={8}
      width={1}
      fill="rgba(194, 1955, 199, 1)"
      borderRadius={0}
    />
    {/* mouth */}
    <rect
      x={2}
      y={12}
      height={1}
      width={12}
      fill="rgba(95, 87, 79, 1)"
      borderRadius={0}
    />
  </rect>
</Stage>
```

<hr />