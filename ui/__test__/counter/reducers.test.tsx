import * as CounterActions from '../../src/counter/actions'
import { counter } from '../../src/counter/reducers'

describe('Counter reducer', () => {
    it('should return the initial state', () => {
        expect(counter(undefined, { type: undefined })).toEqual({
            count: 0,
        })
    })
    it('should increment count by payload', () => {
        expect(counter({ count: 1 }, CounterActions.increment(2))).toEqual({
            count: 3,
        })
    })
    it('should decrement count by payload', () => {
        expect(counter({ count: 1 }, CounterActions.decrement(2))).toEqual({
            count: -1,
        })
    })
})
