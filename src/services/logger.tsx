import { sprintf } from 'sprintf-js'

class LogEvent {
    readonly timestamp: Date
    readonly msg: string
    readonly level: string
    readonly name: string

    constructor(level: string, name: string, msg: string) {
        this.timestamp = new Date()
        this.msg = msg
        this.level = level
        this.name = name
    }
}

interface Config {
    level: 'error' | 'info' | 'warn' | 'debug'
    formatter: (event: LogEvent) => string
}

export class Logger {
    static get(name: string) {
        return new Logger(name)
    }
    private name: string
    private config: Config

    private constructor(name: string, config?: Config) {
        this.name = name
        if (!config) {
            this.config = {
                level: process.env.LOG_LEVEL ? (process.env.LOG_LEVEL.toLowerCase() as any) : 'info',
                formatter: (event: LogEvent): string => {
                    const t = event.timestamp
                    const tf = sprintf(
                        '%02d.%02d.%s %02d:%02d:%02d',
                        t.getDate(),
                        t.getMonth() + 1,
                        t.getFullYear(),
                        t.getHours(),
                        t.getMinutes(),
                        t.getSeconds()
                    )
                    return sprintf('[%-5s] [%s] %s - %s', event.level.toUpperCase(), tf, event.name, event.msg)
                },
            }
        } else {
            this.config = config!
        }
    }

    info(msg: string) {
        this.log('info', msg)
    }

    debug(msg: string) {
        this.log('debug', msg)
    }

    warn(msg: string) {
        this.log('warn', msg)
    }

    error(msg: string) {
        this.log('error', msg)
    }

    private log(level: string, msg: string) {
        if (this.config.level !== level) {
            return
        }
        console.log(this.config.formatter(new LogEvent(this.config.level, this.name, msg)))
    }
}

export default Logger
