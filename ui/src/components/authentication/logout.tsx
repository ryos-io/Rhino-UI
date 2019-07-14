import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { useGlobal } from 'reactn'

export const Logout: React.FunctionComponent = () => {
    const [authenticationService] = useGlobal('authenticationService')
    authenticationService.logout()
    return <Redirect to='/' />
}

export default Logout
