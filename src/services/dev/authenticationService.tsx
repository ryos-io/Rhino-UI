export interface Update {
    authenticated: boolean
}

export type Subscriber = (update: Update) => void

export interface AuthenticationService {
    isAuthenticated(): boolean

    authenticate(data: FormData): Promise<boolean>

    logout(): Promise<void>

    subscribe(subscriber: Subscriber): void

    unsubscribe(subscriber: Subscriber): void
}

export default {
    isAuthenticated: () => true,
    authenticate: () => Promise.resolve(true),
    logout: () => Promise.resolve(),
    subscribe: () => {},
    unsubscribe: () => {},
} as AuthenticationService
