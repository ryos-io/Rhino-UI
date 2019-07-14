import * as React from 'react'
import { useGlobal } from 'reactn'

import { Redirect, Route, RouteProps } from 'react-router-dom'

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
    const [isAuthenticated] = useGlobal('isAuthenticated')
    const [authenticationPath] = useGlobal('authenticationPath')

    let redirectPath: string = ''
    if (!isAuthenticated) {
        redirectPath = authenticationPath
    }

    if (redirectPath) {
        const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />
        return <Route {...props} component={renderComponent} render={undefined} />
    } else {
        return <Route {...props} />
    }
}

export default ProtectedRoute
