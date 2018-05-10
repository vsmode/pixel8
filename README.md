
<div align="center">
  <img src="/assets/logo.png" />
  <h1>Pixel8</h1>  
</div>


A collection of low-res primitives for creating art and games with React

[![NPM Version](https://img.shields.io/npm/v/pixel8.svg?style=flat)](https://www.npmjs.org/package/pixel8)
[![NPM Downloads](https://img.shields.io/npm/dm/pixel8.svg?style=flat)](https://www.npmjs.org/package/pixel8)
[![Discord](https://img.shields.io/discord/443995389809393666.svg?style=flat)](https://discord.gg/VYeM6ZK)

## Why?

Pixel8 is my attempt to create a way for developers – beginners and experts alike – to create pixel art and games with a level of simplicity and freedom that I have yet to discover in any alternative. This library does not aim to be a a full game framework or fantasy console, but it can definitely be used as a building block for such apps.

## Goals

### Easy-to-use

HTML and Javascript are both incredibly popular languages, and if you know either (or both), [React](https://reactjs.org/) will make you feel at home. Pixel8 has been thoughtfully integrated with its own custom renderer. Because of this, primitives such as `<rect>` and `<circ>` are built-in and don't need to be imported. Furthermore, JSX makes it easy to describe relatively positioned elements, compose animations, and more. Not to mention, you can still use all of the tools and libraries you do in all your other projects, such as [Redux](https://redux.js.org), [GraphQL](http://graphql.org/), and [Webpack](https://webpack.js.org/).

### Performant

Under the hood, Pixel8 avoids Canvas's stateful/mutable API and relies primarily on `ArrayBuffer`s to render bytes representing pixels directly to a `<canvas>` `2dContext`. This low-level architecture gives Pixel8 a proper "8-bit" aesthetic, solid performance, and lets future development easily take advantage of new and experimental browser APIs such as `OffscreenCanvas`, `SharedArrayBuffer`, and `WebAssembly`.

### Customizable

As much as possible, Pixel8 doesn't make any assumptions about what you're going for. There are no limitations on color palettes, resolutions, memory/cpu usage, etc. You can make your canvas look like it was created on a ZX Spectrum or a Game Boy. It's entirely up to you. And it's up to the community to develop an ecosystem of tools and libraries that can enforce tasteful constraints for those who wish to opt-in to them.

## Installation

```bash
yarn add pixel8
# or npm i -s pixel8
```

## Getting Started

Definitely check out the interactive documentation at [https://pixel8.vsmode.org/](https://pixel8.vsmode.org/). But if you're looking for a quick start, you probably want to do something like this:

```js
import React from 'react'
import { render } from 'react-dom'
import { Stage } from 'pixel8'

const App = () => (
  <Stage
    width={64}
    height={64}
    scale={8}
    fps={0}
    gridColor="#f4f4f4"
    background="#fff">
    {/*
      * Insert your code here!
      */}
  </Stage>
)

render(<App />, document.getElementById('root'))

```

## Issues? Questions? Contributions?

Feel free to [create an issue](https://github.com/vsmode/pixel8/issues), jump into the [Discord](https://discord.gg/VYeM6ZK), or shoot me a message on [twitter](https://twitter.com/jozanza)
