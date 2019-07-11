import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { bindActionCreators, Dispatch } from 'redux'
import { AppState } from '../state'
import * as counterActions from './actions'

interface Props extends Partial<RouteComponentProps> {
    count: number
    actions: typeof counterActions
}

const mapStateToProps = (state: AppState): Omit<Props, 'actions'> => {
    return { count: state.counter.count }
}

const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'actions'> => ({
    actions: bindActionCreators(counterActions, dispatch),
})

export class CalcApp extends React.Component<Props> {
    render() {
        return (
            <div>
                <div>COUNTER: {this.props.count}</div>
                <button id='decrement' onClick={() => this.props.actions.decrement(1)}>
                    -
                </button>
                <button id='increment' onClick={() => this.props.actions.increment(1)}>
                    +
                </button>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalcApp)
