```js
initialState = { x: 30, y: 30, width: 4, height: 4, borderRadius: 0, delay: 0 };
<div>
  <Stage
    width={64}
    height={64}
    scale={8}
    fps={30}
    gridColor="#f4f4f4"
    background="#fff">
    <transition
      frames={60}
      delay={state.delay}
      ease="easeInOutQuint"
      onTransitionEnd={() => {
        console.log('TRANSITIONED!')
      }}>
      <rect
        x={state.x}
        y={state.y}
        width={state.width}
        height={state.height}
        borderRadius={state.borderRadius}
        fill="rgb(41, 173, 255)"
      />
    </transition>
  </Stage>
  <div>
    <label>props (hit 'enter' to update)</label>
    <textarea
      defaultValue={JSON.stringify(state, null, 2)}
      onKeyDown={e => {
        const { value } = e.target
        if (e.keyCode !== 13) return
        e.preventDefault()
        setState(JSON.parse(value))
      }}
      style={{
        display: 'block',
        width: 512,
        height: 108,
      }}
    />
  </div>
</div>
```