import 'reactn'

declare module 'reactn/default' {
    export interface Reducers {}

    export interface State {
        isAuthenticated: false
        authenticationPath: string
    }
}
