import * as React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import { createProvider } from 'reactn'
import { Navigation } from '../navigation'
import Routes from '../routes'

const InitialGlobalState = {
    isAuthenticated: false,
    authenticationPath: '/login',
}

const Provider = createProvider(InitialGlobalState)

export const App: React.FC = () => {
    return (
        <Provider>
            <BrowserRouter>
                <header>
                    <Route component={Navigation} />
                </header>
                <main>
                    <Container fluid>
                        <Routes />
                    </Container>
                </main>
            </BrowserRouter>
        </Provider>
    )
}

export default App
