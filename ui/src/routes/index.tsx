import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ProtectedRoute, ProtectedRouteProps } from '../routes/ProtectedRoute'
import { State } from '../app/model'

export default (childProps: ProtectedRouteProps & State) => (
    <Switch>
        <Route exact strict path='/' render={() => <Redirect to={'/home'} />} />
        <Route exact path='/home' component={() => <h1>Home</h1>} />
        <Route exact path='/login' component={() => <h1>Login</h1>} />
        <ProtectedRoute {...childProps} exact path='/search' component={() => <h1>Search</h1>} />
        <Route render={() => <React.Fragment>Nothing found :(</React.Fragment>} />
    </Switch>
)
