import * as React from 'react'
import { Jumbotron, Nav, Navbar } from 'react-bootstrap'
import { RouteComponentProps } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
const icon = require('./blue-ferret.png')

interface Props extends RouteComponentProps {}

export class Navigation extends React.Component<Partial<Props>> {
    constructor(props: Partial<Props>) {
        super(props)
        // this.getLocation = this.getLocation.bind(this) // <- not needed for arrow functions
    }

    render() {
        const brand = new Image()
        brand.src = icon

        const path = this.props.location ? this.props.location.pathname : ''
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
}
