import * as React from 'react'

interface State {
    error: Error | null
    errorInfo: React.ErrorInfo | null
}

export default class ErrorBoundary extends React.Component<any, State> {
    constructor(props: any) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        })
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong :(</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        // Normally, just render children
        return this.props.children
    }
}
