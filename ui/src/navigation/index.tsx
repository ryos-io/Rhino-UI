import * as React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { RouteProps } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
const icon = require('./blue-ferret.png')

export const Navigation = (props: RouteProps) => {
    const brand = new Image()
    brand.src = icon

    const path = props.location ? props.location.pathname : ''
    return (
        <React.Fragment>
            <Navbar
                collapseOnSelect
                expand='md'
                bg='dark'
                variant='dark'
                sticky='top'
                style={{ justifyContent: 'normal' }}>
                <Navbar.Toggle className='mr-2' aria-controls='responsive-navbar-nav' />
                <Navbar.Brand as={Link} to='/'>
                    <img src={icon} alt={'Logo'} width='40px' />
                </Navbar.Brand>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link as={NavLink} href='#' to='/home' active={path === '/home'}>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} href='#' to='/search' active={path === '/search'}>
                            Search
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}
export default Navigation
