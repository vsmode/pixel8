```js
const animations = {
  moveDown: (n, props) => ({
    ...props,
    y: props.y + n
  }),
  moveRight: (n, props) => ({
    ...props,
    x: props.x + n
  })
};
<Stage
  width={64}
  height={64}
  scale={8}
  fps={30}
  gridColor="#f4f4f4"
  background="#fff">
  {/*
    * ~(˘▾˘~) composable animations with easing (~˘▾˘)~
    */}
  <animation
    use={animations.moveDown}
    frames={8}
    delay={2}
    loops={Infinity}
    ease="easeInCubic"
    alternate>
    <animation
      use={animations.moveRight}
      frames={61}
      delay={32}
      loops={Infinity}
      ease="easeInOutCubic"
      alternate>
      <rect
        x={0}
        y={0}
        height={4}
        width={4}
        fill="rgba(41, 173, 255, 1)"
        borderRadius={0}
      />
    </animation>
  </animation>
  {/*
    * with a delay
    */}
  <animation
    use={animations.moveRight}
    frames={61}
    delay={32}
    loops={Infinity}
    alternate>
    <rect
      x={0}
      y={16}
      height={4}
      width={4}
      fill="rgba(41, 173, 255, 1)"
      borderRadius={0}
    />
  </animation>
  {/*
    * sequential animations
    */}
  <animation
    use={(t, props) => {
      const n = 60
      return t <= n
        ? animations.moveRight(t, props)
        : animations.moveDown(t - n, animations.moveRight(n, props))
    }}
    frames={80}
    alternate={true}>
      <rect
        x={0}
        y={32}
        height={4}
        width={4}
        fill="rgba(41, 173, 255, 1)"
        borderRadius={0}
      />
  </animation>
</Stage>
```