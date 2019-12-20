import * as React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import { setGlobal } from 'reactn'
import ErrorBoundary from './components/error'
import { Navigation } from './components/navigation'
import Routes from './components/routes'
import authenticatonService from './services/dev/authenticationService'

const InitialGlobalState = {
    authenticationPath: '/login',
    authenticationService: authenticatonService,
}
setGlobal(InitialGlobalState)

export const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <header>
                    <Route component={Navigation} />
                </header>
                <main>
                    <Container>
                        <Routes />
                    </Container>
                </main>
            </BrowserRouter>
        </ErrorBoundary>
    )
}

export default App
