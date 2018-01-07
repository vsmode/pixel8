import { compose } from 'recompose'
import { injectGlobal } from 'styled-components'
import * as pixel8 from './src/index'
global.Stage = pixel8.Stage
global.pixel8 = pixel8
global.compose = compose
injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
  }
  .logo {
    display: block;
    margin: 0 auto;
    image-rendering: pixelated;
    height: 128px;
    width: 128px;
    margin-bottom: 24px;
  }
  .rsg--sidebar-4 {
    .rsg--logo-5 {
      display: none;
    }
    [class^="rsg--search"] {
      padding: 6px;
      background: 0 0;
      transition: top .5s ease;
      background: #fff;
      border-bottom: 1px solid rgba(0,0,0,.07);
      border-top: 1px solid rgba(0,0,0,.07);
      margin-bottom: 10px;
      margin-top: -1px;
      input {
        width: 100%;
        background: 0 0;
        border: 1px solid transparent;
        box-shadow: none;
        outline: 0;
        line-height: 22px;
        padding: 7px 7px;
        color: #364149;
      }
    }
    [class^="rsg--list"] {
      padding: 0;
      [class*="rsg--isChild"] {
        border: none !important;
      }
      [class*="rsg--isChild"] + [class*="rsg--item"]:nth-child(3) {
        border-top: 1px solid rgba(0,0,0,.07);
        margin-top: 12px;
        padding: 16px 15px;
        & > ul {
          margin-top: 12px;
        }
      } 
      [class*="rsg--item"] {
        border: none;
        padding: 10px 15px;
        margin: 0;
        [class^="rsg--link"] {
          color: #364149;
          &.active {
            color: #008cff;
          }
        }
      }
    }
  }
  main {
    padding: 48px 64px !important;
    pre {
      overflow: auto !important;
    }
    article blockquote[class^="rsg--blockquote"] {
      margin: 0;
      margin-bottom: .85em;
      padding: 0 15px;
      color: #858585;
      border-left: 4px solid #e5e5e5;
    }
    article p {
      letter-spacing: .2px !important;
    }
    h1 {
      margin-bottom: .5em !important;
    }
    h1, h2, h3, h4, h5, h6 {
      &, a, code {
        font-weight: bold !important;
      }
    }
    h2 {
      code {
        font-size: 18px !important;
      }
    }
    code {
      font-size: 14px !important;
      padding: .2em .5em !important;
      margin: 0 !important;
      background-color: #f7f7f7 !important;
    }
    h4[class^="rsg--root"],
    header[class^="rsg--header"] h4,
    header[class^="rsg--header"] div[class^="rsg--wrapper"] {
      display: none;
    }
    td [class^="rsg--code"] {
      font-size: 11px !important;
    }
    td span code, td p code {
      white-space: nowrap !important;
    }

    .react-codemirror2 {
      .CodeMirror-sizer {
        min-height: 0 !important;
        max-height: 320px;
      }
      // .cm-s-base16-light.CodeMirror {
      //   background-color: #2c3e50;
      //   color: rgba(233, 237, 237, 1);
      //   border-radius: 4px;
      //   margin-top: 8px;
      // }
      // .cm-s-base16-light .CodeMirror-gutters {
      //   background: #2c3e50;
      //   color: rgb(83,127,126);
      //   border: none;
      // }
      // .cm-s-base16-light .CodeMirror-guttermarker, .cm-s-base16-light .CodeMirror-guttermarker-subtle, .cm-s-base16-light .CodeMirror-linenumber { color: rgb(83,127,126); }
      // .cm-s-base16-light .CodeMirror-cursor { border-left: 1px solid #f8f8f0; }
      // .cm-s-base16-light div.CodeMirror-selected { background: rgba(255, 255, 255, 0.15); }
      // .cm-s-base16-light.CodeMirror-focused div.CodeMirror-selected { background: rgba(255, 255, 255, 0.10); }
      // .cm-s-base16-light .CodeMirror-line::selection, .cm-s-base16-light .CodeMirror-line > span::selection, .cm-s-base16-light .CodeMirror-line > span > span::selection { background: rgba(255, 255, 255, 0.10); }
      // .cm-s-base16-light .CodeMirror-line::-moz-selection, .cm-s-base16-light .CodeMirror-line > span::-moz-selection, .cm-s-base16-light .CodeMirror-line > span > span::-moz-selection { background: rgba(255, 255, 255, 0.10); }
      
      // .cm-s-base16-light .CodeMirror-activeline-background { background: rgba(0, 0, 0, 0); }
      // .cm-s-base16-light .cm-keyword { color: rgba(199, 146, 234, 1); }
      // .cm-s-base16-light .cm-operator { color: rgba(233, 237, 237, 1); }
      // .cm-s-base16-light .cm-variable-2 { color: #80CBC4; }
      // .cm-s-base16-light .cm-variable-3, .cm-s-base16-light .cm-type { color: #82B1FF; }
      // .cm-s-base16-light .cm-builtin { color: #DECB6B; }
      // .cm-s-base16-light .cm-atom { color: #F77669; }
      // .cm-s-base16-light .cm-number { color: #F77669; }
      // .cm-s-base16-light .cm-def { color: rgba(233, 237, 237, 1); }
      // .cm-s-base16-light .cm-string { color: #C3E88D; }
      // .cm-s-base16-light .cm-string-2 { color: #80CBC4; }
      // .cm-s-base16-light .cm-comment { color: #999999; }
      // .cm-s-base16-light .cm-variable { color: #82B1FF; }
      // .cm-s-base16-light .cm-tag { color: #80CBC4; }
      // .cm-s-base16-light .cm-meta { color: #80CBC4; }
      // .cm-s-base16-light .cm-attribute { color: #FFCB6B; }
      // .cm-s-base16-light .cm-property { color: #80CBAE; }
      // .cm-s-base16-light .cm-qualifier { color: #DECB6B; }
      // .cm-s-base16-light .cm-variable-3, .cm-s-base16-light .cm-type { color: #DECB6B; }
      // .cm-s-base16-light .cm-tag { color: rgba(255, 83, 112, 1); }
      // .cm-s-base16-light .cm-error {
      //   color: rgba(255, 255, 255, 1.0);
      //   background-color: #EC5F67;
      // }
      // .cm-s-base16-light .CodeMirror-matchingbracket {
      //   text-decoration: underline;
      //   color: white !important;
      // }
    }
  }
`
const updateActiveNavLink = () => {
  const { hash } = window.location
  ;[...document.querySelectorAll('[class^="rsg--link"]')].forEach(x => {
    x.classList.remove('active')
  })
  const anchor = document.body.querySelector(
    `[class^="rsg--list"] [class^="rsg--link"][href="${hash}"]`,
  )
  if (!anchor) return
  anchor.classList.add('active')
}

window.addEventListener('hashchange', updateActiveNavLink)
document.addEventListener('DOMContentLoaded', () => {
  const search = document.body.querySelector('[class^="rsg--search"] input')
  if (search) search.placeholder = 'Type to search'
  updateActiveNavLink()
  const logo = document.createElement('img')
  logo.src = '/logo.png'
  logo.className = 'logo'
  document.body.querySelector('.rsg--root-8').prepend(logo)
})
