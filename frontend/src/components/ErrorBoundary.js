import React from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>Something went wrong.</h1>
          <Link to='/home'>
            <button>Back to Safety</button>
          </Link>
        </main>
      )
    }
    return this.props.children
  }

}

export default ErrorBoundary