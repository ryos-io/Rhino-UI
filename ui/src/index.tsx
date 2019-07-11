import * as React from 'react'
import { Container } from 'react-bootstrap'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
// no curly braces since we want to import the default export
// the other one is for tests
import CalcApp from './counter'
import { Navigation } from './navigation'
import { SearchApp } from './search'
import { store } from './store'

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <header>
                <Route component={Navigation} />
            </header>
            <main>
                <Container fluid>
                    <Switch>
                        <Route exact strict path='/' render={() => <Redirect to={'/home'} />} />

                        <Route exact path='/home' component={CalcApp} />
                        <Route exact path='/search' component={SearchApp} />
                        <Route render={() => <React.Fragment>Nothing found :(</React.Fragment>} />
                    </Switch>
                </Container>
            </main>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

// necessary for hot reload
declare let module: any
if (module.hot) {
    module.hot.accept()
}
