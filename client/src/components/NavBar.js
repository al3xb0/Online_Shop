import React, {useContext} from 'react';
import {Context} from "../index";
import {Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)


    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: "white"}} href={SHOP_ROUTE}>Online SHOP</NavLink>
                <Nav className="ml-auto" style={{color: "white"}}>

                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;