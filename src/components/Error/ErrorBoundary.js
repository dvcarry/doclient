
import { Component } from 'react'

class ErrorBoundary extends Component {
    state = {
        error: null,
    };
    static getDerivedStateFromError(error) {
        console.log("🚀 ~ file: ErrorBoundary.js ~ line 9 ~ ErrorBoundary ~ getDerivedStateFromError ~ error", error.response)
        return { error: error.response.data };
    }
    render() {
        const { error } = this.state;
        console.log("🚀 ~ file: ErrorBoundary.js ~ line 13 ~ ErrorBoundary ~ render ~ error", error)

        if (error) {
            return (
                <div>
                    <p>Seems like an error occured!</p>
                    <p>{error.message}</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;