import { Component } from "react";

// Protect other component instantiations
class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }
    // makes the component an error boundary
    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong.</p>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;