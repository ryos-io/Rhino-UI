import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))

// necessary for hot reload
declare let module: any
if (module.hot) {
    module.hot.accept()
}
