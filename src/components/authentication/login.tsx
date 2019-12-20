import * as React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Redirect, RouteComponentProps } from 'react-router'
import { useGlobal } from 'reactn'
import { Subscriber } from '../../services/dev/authenticationService'
import Logger from '../../services/logger'

const log = Logger.get('Login')

export const Login: React.FC<RouteComponentProps> = (props) => {
    const [authenticationService] = useGlobal('authenticationService')
    const [, setUsername] = React.useState('username')
    const [, setPassword] = React.useState('password')
    const [error, setError] = React.useState('')
    const [isAuthenticated, userHasAuthenticated] = React.useState(false)
    const form = React.useRef<HTMLFormElement>(null)
    const { from: redirectedFrom } = props.location.state || { from: '/' }

    React.useEffect(() => {
        const subscriber: Subscriber = (update) => {
            userHasAuthenticated(update.authenticated)
        }
        authenticationService.subscribe(subscriber)
        return () => {
            authenticationService.unsubscribe(subscriber)
        }
    }, [])
    const tryLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const success = await authenticationService.authenticate(new FormData(form.current!))
        if (!success) {
            setError("Authentication failed. Don't try to fool me!")
        }
    }

    if (authenticationService.isAuthenticated() || isAuthenticated) {
        log.debug('Redirecting to previous route...')
        return <Redirect to={redirectedFrom} />
    }

    return (
        <Container>
            <Row>
                <Col className='col-sm-6 offset-sm-3'>
                    <div
                        className={'alert alert-danger'}
                        role='alert'
                        style={{ visibility: error || error.length > 0 ? 'visible' : 'hidden' }}>
                        {error}
                    </div>
                    <Form ref={form as any} onSubmit={tryLogin}>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name='username'
                                type='username'
                                placeholder='Enter username'
                                onChange={(e: any) => {
                                    const event = e as React.FormEvent<HTMLInputElement>
                                    setUsername(event.currentTarget.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                type='password'
                                placeholder='Password'
                                onChange={(e: any) => {
                                    const event = e as React.FormEvent<HTMLInputElement>
                                    setPassword(event.currentTarget.value)
                                }}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
