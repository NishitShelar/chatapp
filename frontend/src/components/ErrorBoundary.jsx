import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Do not update state so UI is not replaced
    return { hasError: false };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log error
    // console.error(error, errorInfo);
  }
  handleReload = () => {
    window.location.reload();
  };
  render() {
    // Always render children, never show fallback UI
    return this.props.children;
  }
}
export default ErrorBoundary; 