import * as React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route } from 'react-router-dom'
import { Navigation } from '../navigation'
import { Props, State } from './model'
import Routes from '../routes'
import { ProtectedRouteProps } from 'routes/ProtectedRoute'

const initialState = Object.freeze({
    isAuthenticated: true,
})
const defaultProps = Object.freeze({})

export default class App extends React.Component<Props, State> {
    static readonly defaultProps = defaultProps
    readonly state = initialState

    userHasAuthenticated = (authenticated: boolean) => {
        this.setState({ isAuthenticated: authenticated })
    }

    render = () => {
        const defaultProtectedRouteProps: ProtectedRouteProps = {
            isAuthenticated: this.state.isAuthenticated,
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
}
