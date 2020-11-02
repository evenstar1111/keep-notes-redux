import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: "",
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error }
  }

  render() {
    if (this.state.hasError) {
      return <h1>UI could not be loaded, error: {this.state.error}</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
