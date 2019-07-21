import 'reactn'
import { AuthenticationService } from 'services/dev/authenticationService'

declare module 'reactn/default' {
    export interface State {
        authenticationService: AuthenticationService
        authenticationPath: string
    }
}
