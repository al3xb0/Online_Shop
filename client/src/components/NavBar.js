import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: "white"}} href={SHOP_ROUTE}>Online SHOP</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {user.isAdmin ?
                            <Nav className="ml-auto" style={{color: "white"}}>
                                <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)}>Admin</Button>
                                <Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)} className="ms-2">Basket</Button>
                                <Button variant={"outline-light"} className="ms-2">{user.user.email}</Button>
                            </Nav>
                            :
                            <Nav><Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)}>Basket</Button></Nav>
                        }
                        <Button variant={"outline-light"} onClick={() => logOut()} className="ms-2">Log out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;