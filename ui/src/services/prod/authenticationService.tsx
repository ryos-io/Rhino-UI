import Logger from '../logger'

const log = Logger.get('Login')

export interface Update {
    authenticated: boolean
}

export type Subscriber = (update: Update) => void

class AuthenticationService {
    private authenticated = false
    private subscriptions: Subscriber[] = []

    isAuthenticated(): boolean {
        return this.authenticated
    }

    async authenticate(data: FormData): Promise<boolean> {
        const response = await fetch('/api/v1/login', {
            method: 'post',
            body: data,
            redirect: 'follow',
            credentials: 'same-origin',
        })
        if (response.status > 400 || response.url.endsWith('?error')) {
            log.info('Authentication failed')
            return false
        } else {
            log.info('Login successful!')
            this.authenticated = true
            this.subscriptions.forEach((subscription) => {
                subscription.apply(null, [
                    {
                        authenticated: true,
                    },
                ])
            })
            return true
        }
    }

    async logout(): Promise<void> {
        log.info('Logged out')
        await fetch('/api/v1/logout', {
            method: 'get',
            redirect: 'follow',
            credentials: 'same-origin',
        })
        this.authenticated = false
        this.subscriptions.forEach((subscription) => {
            subscription.apply(null, [
                {
                    authenticated: false,
                },
            ])
        })
    }

    subscribe(subscriber: Subscriber) {
        if (!this.subscriptions.find((s) => s === subscriber)) {
            this.subscriptions.push(subscriber)
        }
        log.debug(`Subscriber subscribed. Total=${this.subscriptions.length}`)
    }

    unsubscribe(subscriber: Subscriber) {
        const index = this.subscriptions.findIndex((s) => s === subscriber)
        if (index >= 0) {
            log.debug(`Subscribing subscriber ${index}`)
            this.subscriptions = this.subscriptions.filter((s) => s !== subscriber)
        } else {
            log.debug(`Unable to find subscriber`)
        }
        log.debug(`Subscriber unsubscribed. Total=${this.subscriptions.length}`)
    }
}

export default new AuthenticationService()
