import * as React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import { Navigation } from '../navigation'
import { Props } from './model'
import Routes from '../routes'
import { ProtectedRouteProps } from 'routes/ProtectedRoute'

export const App: React.FC<Props> = () => {
    const [isAuthenticated, userHasAuthenticated] = React.useState(false)
    const defaultProtectedRouteProps: ProtectedRouteProps = {
        isAuthenticated,
        userHasAuthenticated,
        authenticationPath: '/login',
    }
    return (
        <BrowserRouter>
            <header>
                <Route component={Navigation} />
            </header>
            <main>
                <Container fluid>
                    <Routes {...defaultProtectedRouteProps} />
                </Container>
            </main>
        </BrowserRouter>
    )
}

export default App