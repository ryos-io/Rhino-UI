import { createReducer, PayloadAction } from 'redux-starter-kit'

import * as CounterActions from './actions'
import { CounterState } from './state'

// methods accepting single parameter that will be the payload, e.g. increment(3)
export const counter = createReducer(
    { count: 0 },
    {
        [CounterActions.increment.type]: (state: CounterState, action: PayloadAction<number>) => {
            return {
                ...state,
                count: state.count + action.payload,
            }
        },
        [CounterActions.decrement.type]: (state: CounterState, action: PayloadAction<number>) => {
            return {
                ...state,
                count: state.count - action.payload,
            }
        },
    }
)
