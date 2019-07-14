import 'reactn'

declare module 'reactn/default' {
    export interface State {
        isAuthenticated: false
        authenticationPath: string
    }
}
