import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login, Logout } from '../authentication'
import Run from '../run'
import { ProtectedRoute } from './ProtectedRoute'

export default () => (
    <Switch>
        <Route exact strict path='/' render={() => <Redirect to={'/home'} />} />
        <Route exact path='/home' render={() => <h1>Home</h1>} />
        <ProtectedRoute exact path='/run' render={() => <Run />} />
        <Route exact path='/login' render={(props) => <Login {...props} />} />
        <Route exact path='/logout' render={() => <Logout />} />
        <ProtectedRoute exact path='/search' render={() => <h1>Search</h1>} />
        <Route render={() => <React.Fragment>Nothing found :(</React.Fragment>} />
    </Switch>
)
