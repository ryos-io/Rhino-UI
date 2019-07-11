import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import { counter } from './counter/reducers'

import logger from 'redux-logger'

export const store = configureStore({
    reducer: { counter },
    devTools: true,
    middleware: [...getDefaultMiddleware(), logger],
})

// reducer changes are not automatically reflected to the browser
// need this snippet to do so
if (module.hot) {
    module.hot.accept('./counter/reducers', () => {
        const nextRootReducer = require('./counter/reducers').default
        store.replaceReducer(nextRootReducer)
    })
}
