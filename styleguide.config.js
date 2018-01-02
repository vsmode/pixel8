const { createConfig, babel } = require('webpack-blocks')
module.exports = {
  title: 'Pixel8',
  showSidebar: true,
  showCode: true,
  showUsage: true,
  theme: {
    sidebarWidth: 300,
    color: {
      base: '#364149',
      link: '#008cff',
      linkHover: '#008cff',
      sidebarBackground: '#fafafa',
    },
    fontFamily: {
      base: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      monospace: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    },
    fontSize: {
      base: 14,
      h1: 36,
      h2: 24,
      h3: 18,
      h4: 16,
    },
  },
  assetsDir: './assets',
  require: [require('path').resolve(__dirname, 'styleguide.setup.js')],
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Getting Started',
      content: 'docs/getting-started.md',
    },
    {
      name: 'Usage',
      sections: [
        {
          name: 'The Stage',
          sections: [
            {
              components: 'src/components/Stage.js',
            },
          ],
        },
        {
          name: 'Drawing Shapes',
          sections: [
            {
              components: 'src/components/pixel.js',
            },
            {
              components: 'src/components/rectangle.js',
            },
            {
              components: 'src/components/circle.js',
            },
          ],
        },
        {
          name: 'Creating Motion',
          sections: [
            {
              components: 'src/components/transition.js',
            },
            {
              components: 'src/components/animation.js',
            },
          ],
        },
        {
          name: 'Text',
          sections: [
            {
              components: 'src/components/text.js',
            },
          ],
        },
        {
          name: 'Sprites',
          sections: [
            {
              components: 'src/components/sprite.js',
            },
          ],
        },
        {
          name: 'Buffers',
          sections: [
            {
              components: 'src/components/buffer.js',
            },
          ],
        },
      ],
    },
  ],
  webpackConfig: createConfig([babel()]),
  getComponentPathLine: componentPath => {
    const name = require('path').basename(componentPath, '.js')
    console.log(name)
    switch (name) {
      case 'Stage':
        return `import { ${name} } from 'pixel8'`
      default:
        return 'no import required :)'
    }
  },
}
