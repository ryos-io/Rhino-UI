import * as React from 'react'
import { useGlobal } from 'reactn'

import { Redirect, Route, RouteProps } from 'react-router-dom'

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
    const [authenticationService] = useGlobal('authenticationService')
    const [authenticationPath] = useGlobal('authenticationPath')

    let redirectPath: string = ''
    if (!authenticationService.isAuthenticated()) {
        redirectPath = authenticationPath
    }

    if (redirectPath) {
        const renderComponent = () => (
            <Redirect
                to={{
                    pathname: redirectPath,
                    state: { from: props.location != null ? props.location.pathname : undefined },
                }}
            />
        )
        return <Route {...props} component={renderComponent} render={undefined} />
    } else {
        return <Route {...props} />
    }
}

export default ProtectedRoute
