import * as React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { RouteProps } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { useGlobal } from 'reactn'
import { Subscriber } from '../../services/dev/authenticationService'

const icon = require('./blue-ferret.png')

export const Navigation = (props: RouteProps) => {
    const [authenticationService] = useGlobal('authenticationService')
    const brand = new Image()
    brand.src = icon

    const [isAuthenticated, userHasAuthenticated] = React.useState(false)
    React.useEffect(() => {
        userHasAuthenticated(authenticationService.isAuthenticated())
        const subscriber: Subscriber = (update) => {
            userHasAuthenticated(update.authenticated)
        }
        authenticationService.subscribe(subscriber)
        return () => {
            authenticationService.unsubscribe(subscriber)
        }
    }, [])

    const path = props.location ? props.location.pathname : ''
    return (
        <Navbar collapseOnSelect expand='md' bg='dark' variant='dark' style={{ marginBottom: '20px' }}>
            <Navbar.Toggle className='mr-2' aria-controls='responsive-navbar-nav' />
            <Navbar.Brand as={Link} to='/'>
                <img src={icon} alt={'Logo'} width='40px' />
            </Navbar.Brand>
            <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link as={NavLink} href='#' to='/home' active={path === '/home'}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} href='#' to='/run' active={path === '/run'} hidden={!isAuthenticated}>
                        Run
                    </Nav.Link>
                    <Nav.Link as={NavLink} href='#' to='/search' active={path === '/search'} hidden={!isAuthenticated}>
                        Search
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link
                        as={NavLink}
                        href='#'
                        to='/login'
                        active={path === '/login'}
                        hidden={isAuthenticated}
                        className='just'>
                        Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} href='#' to='/logout' active={path === '/logout'} hidden={!isAuthenticated}>
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Navigation
