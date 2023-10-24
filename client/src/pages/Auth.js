import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            if (user.user.role === 'ADMIN')
            {
                user.setIsAdmin(true)}
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}>
           <Card style={{width: 600}} className="p-5">
               <h2 className="m-lg-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
               <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Enter your email."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                   <Form.Control
                       className="mt-4"
                       placeholder="Enter your password."
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       type={"password"}
                   />
                   <Col className="d-flex justify-content-between mt-4 ps-4">
                       {isLogin ?
                           <div>
                               Not registered yet? <NavLink to = {REGISTRATION_ROUTE}>Register!</NavLink>
                           </div>
                           :
                           <div>
                               Already have an account? <NavLink to = {LOGIN_ROUTE}>Login!</NavLink>
                           </div>
                       }
                       <Button
                           variant={"outline-success"}
                           onClick={click}
                       >
                           {isLogin ? 'Log in' : 'Register'}
                       </Button>
                   </Col>

               </Form>
           </Card>
        </Container>
    );
});

export default Auth;