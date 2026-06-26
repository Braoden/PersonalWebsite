import { Component } from 'react'

// Catches render/runtime errors from the lazy 3D scene (e.g. WebGL
// unavailable, or the code-split chunk failing to load) and shows the given
// fallback instead of crashing the whole page.
export default class ErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
