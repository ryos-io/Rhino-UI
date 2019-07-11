import { createAction, PayloadActionCreator } from 'redux-starter-kit'

export const increment: PayloadActionCreator<number> = createAction('increment')
export const decrement: PayloadActionCreator<number> = createAction('decrement')
