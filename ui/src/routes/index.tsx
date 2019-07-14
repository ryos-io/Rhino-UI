import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../routes/ProtectedRoute'

export default () => (
    <Switch>
        <Route exact strict path='/' render={() => <Redirect to={'/home'} />} />
        <Route exact path='/home' component={() => <h1>Home</h1>} />
        <Route exact path='/login' component={() => <h1>Login</h1>} />
        <ProtectedRoute exact path='/search' component={() => <h1>Search</h1>} />
        <Route render={() => <React.Fragment>Nothing found :(</React.Fragment>} />
    </Switch>
)
