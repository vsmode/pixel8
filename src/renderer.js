import Reconciler from 'react-reconciler'

export default createElement => {
  /** Reconciler */
  const PixelRenderer = Reconciler({
    /**
     * Host context getters
     */
    getRootHostContext: root => root,
    getChildHostContext: root => root,
    /**
     * Component instance creation
     */
    createInstance: function createInstance(type, props, root, host, fiber) {
      return createElement(type, props, root, null)
    },
    appendInitialChild: (parent, child) => {
      parent.appendChild(child)
    },
    /**
     * Manage prop updates
     */
    finalizeInitialChildren: (host, type, props) => {
      return false
    },
    prepareForCommit: () => {},
    resetAfterCommit: () => {},
    prepareUpdate: (instance, type, props, nextProps) => {
      return { ...props, ...nextProps }
    },
    /**
     * Text handling
     */
    createTextInstance: (text, root, fiber) => {
      throw new Error('Raw text children are not supported by <PixelCanvas>')
    },
    commitTextUpdate: () => {
      throw new Error('Raw text children are not supported by <PixelCanvas>')
    },
    resetTextContent: elem => {
      throw new Error('Raw text children are not supported by <PixelCanvas>')
    },
    shouldSetTextContent: () => false,
    /**
     * Other stuff
     */
    getPublicInstance: inst => inst,
    shouldDeprioritizeSubtree: (type, props) => false,
    now: () => {},
    useSyncScheduling: true,
    /**
     * Mutations
     */
    mutation: {
      appendChild: (parent, child) => {
        parent.appendChild(child)
      },
      appendChildToContainer: (parent, child) => {
        parent.appendChild(child)
      },
      insertBefore: (parent, child, beforeChild) => {
        parent.appendChild(child)
      },
      insertInContainerBefore: (parent, child, beforeChild) => {
        parent.appendChild(child)
      },
      removeChild: (parent, child) => {
        parent.removeChild(child)
      },
      removeChildFromContainer: (parent, child) => {
        parent.removeChild(child)
      },
      commitUpdate: (inst, payload, type, props, nextProps) => {
        inst.setProps(payload)
      },
      commitMount: (inst, payload, type, props, nextProps) => {},
      commitTextUpdate: (inst, text, nextText) => {
        throw new Error('Raw text children are not supported by <PixelCanvas>')
      },
    },
  })

  let injected = false
  const injectIntoDevTools = () => {
    if (injected) return
    injected = true
    PixelRenderer.injectIntoDevTools({
      bundleType: 1, // 0 for PROD, 1 for DEV
      version: '0.0.0', // version for your renderer
      rendererPackageName: 'pixel-renderer', // package name
      findHostInstanceByFiber: PixelRenderer.findHostInstance, // host instance (root)
    })
  }

  const render = pixelCanvas => {
    injectIntoDevTools()
    pixelCanvas.root =
      pixelCanvas.root ||
      PixelRenderer.createContainer(pixelCanvas, pixelCanvas.canvas)
    PixelRenderer.updateContainer(
      pixelCanvas.props.children,
      pixelCanvas.root,
      pixelCanvas,
    )
  }

  const unmount = pixelCanvas => {
    PixelRenderer.updateContainer(null, pixelCanvas.root, pixelCanvas)
  }

  return {
    injectIntoDevTools,
    render,
    unmount,
    PixelRenderer,
  }
}
