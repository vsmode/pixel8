### Pixel8

> A collection of low-res primitives for creating art and games with React

If you want to learn how to use it in your project, you may want to skip down to the [Usage](#usage) section. Otherwise, keep reading to learn a little about the background story of this library.

## Motivation

I've been interested in making games and pixel art for a long time. I've dabbled with a number of frameworks like [Phaser](https://phaser.io/), [Game Maker](https://www.yoyogames.com/gamemaker), and [Unity](https://unity3d.com/). While they are all amazing feats of engineering, personally, I found them to be rather heavyweight in their approach – tons of setup, massive APIs, and tutorials/docs that encourage developers to take a very mutative/object-oriented approach to creating games.

Because of these complexities, I was very excited to learn about the existence of [fantasy consoles](https://medium.com/@G05P3L/fantasy-console-wars-a-guide-to-the-biggest-players-in-retrogamings-newest-trend-56bbe948474d). They are very limited by design, and this approach helps developers learn and build basic games quite easily. However, trying to make any game of scale or do moderately complex things like animations, transitions, or palette swapping can be incredibly challenging to code, test, share, and maintain.

Pixel8 is my attempt to create a way for developers – beginners and experts alike – to create pixel art and games with a level of simplicity and freedom that I have yet to discover in any alternative. This library does not aim to be a a full game framework or fantasy console, but it can definitely be used as a building block for such apps.

Anyways, here are some of the main goals I took into consideration when creating Pixel8:

#### Easy-to-use

HTML and Javascript are both incredibly popular languages, and if you know either (or both), [React](https://reactjs.org/) will make you feel at home. Pixel8 has been thoughtfully integrated with its own custom renderer. Because of this, primitives such as `<rect>` and `<circ>` are built-in and don't need to be imported. Furthermore, JSX makes it easy to describe relatively positioned elements, compose animations, and more. Not to mention, you can still use all of the tools and libraries you do in all your other projects, such as [Redux](https://redux.js.org), [GraphQL](http://graphql.org/), and [Webpack](https://webpack.js.org/).

#### Performant

Under the hood, Pixel8 avoids Canvas's stateful/mutable API and relies primarily on `ArrayBuffer`s to render bytes representing pixels directly to a `<canvas>` `2dContext`. This low-level architecture gives Pixel8 a proper "8-bit" aesthetic, solid performance, and lets future development easily take advantage of new and experimental browser APIs such as `OffscreenCanvas`, `SharedArrayBuffer`, and `WebAssembly`.

#### Customizable

As much as possible, Pixel8 doesn't make any assumptions about what you're going for. There are no limitations on color palettes, resolutions, memory/cpu usage, etc. You can make your canvas look like it was created on a ZX Spectrum or a Game Boy. It's entirely up to you. And it's up to the community to develop an ecosystem of tools and libraries that can enforce tasteful constraints for those who wish to opt-in to them.

<hr />