```js
initialState = { yOffset: 0 };
const w = 256;
const h = 256;
const lineHeight = 10;
const text = 'Protip:\nScroll with your trackpad or mousewheel\n...\n..\n.'.toUpperCase() + ('\n\nSweet candy canes liquorice ice cream topping cheesecake biscuit fruitcake. Tiramisu sesame snaps chocolate bar ice cream candy. Cake croissant liquorice. Biscuit fruitcake sweet roll fruitcake pastry. Dessert biscuit macaroon muffin tart liquorice marzipan tootsie roll. Biscuit croissant carrot cake bonbon marzipan jujubes gummi bears cake. Souffle pastry candy canes. Muffin chocolate lollipop cotton candy carrot cake chocolate bar candy. Jelly beans chupa chups bear claw jelly beans fruitcake tiramisu.'.toUpperCase().repeat(20));
const lines = pixel8.utils.stringToLines(text.split(/[ ]/), pixel8.fonts.micro.width, w - 10);
const MAX_YOFFSET = 0;
const MIN_YOFFSET = (lines.length - (1 + Math.floor((h - 10) / lineHeight))) * -lineHeight;
const scrollY = 1 + Math.round((h - 17) * (state.yOffset / MIN_YOFFSET));
<Stage
  width={w}
  height={h}
  scale={2}
  fps={60}
  background="#000"
  onWheel={e => {
    // handle scrolling
    let yOffset = state.yOffset - e.deltaY
    if (MAX_YOFFSET < yOffset) yOffset = MAX_YOFFSET
    else if (MIN_YOFFSET > yOffset) yOffset = MIN_YOFFSET
    else e.preventDefault()
    setState({ yOffset })
  }}>
  {/* draw text at yOffset */}
  <text
    text={text}
    x={5}
    y={5}
    width={w - 10}
    height={h - 10}
    lineHeight={lineHeight}
    yOffset={state.yOffset}
    fill="#fff"
  />
  {/* scrollbar */}
  <rect
    x={w - 6}
    y={scrollY}
    width={5}
    height={15}
    fill="#fff"
    borderRadius={1}
  />
</Stage>
```