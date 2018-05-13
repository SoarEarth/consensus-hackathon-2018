import * as React from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';
import './index.css';

interface NavigationProps extends React.Props<Navigation> {
}

interface NavigationState {
    isOpen: boolean
}

class Navigation extends React.Component<NavigationProps, NavigationState> {

    constructor(props: NavigationProps) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    public render(): React.ReactElement<{}> {

        return (
            <Navbar dark color="dark" expand="md">
                <Container>
                    <NavbarBrand href="#">GrowAUZ</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="../">Overview</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="../farmer">Farmer</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="../warehouse">Warehouse</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="../retailer">Retailer</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="../buyer">Buyer</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default (Navigation);
