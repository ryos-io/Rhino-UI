import { shallow } from 'enzyme'
import React = require('react')
import { CalcApp } from '../../src/counter'

const props = {
    count: 0,
    actions: {
        increment: jest.fn() as any,
        decrement: jest.fn() as any,
    },
}

describe('<Counter />', () => {
    test('dispatches event to increase counter', () => {
        const component = shallow(<CalcApp {...props} />)
        const inc = component.find('#increment')
        const dec = component.find('#decrement')
        expect(inc.length).toBe(1)
        inc.simulate('click')
        expect(props.actions.increment).toBeCalledTimes(1)
        expect(props.actions.increment).toBeCalledWith(1)
        dec.simulate('click')
        expect(props.actions.decrement).toBeCalledTimes(1)
        expect(props.actions.decrement).toBeCalledWith(1)
    })
})
