import React from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}>
           <Card style={{width: 600}} className="p-5">
               <h2 className="m-lg-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
               <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-4"
                        placeholder="Enter your email."
                    />
                   <Form.Control
                       className="mt-4"
                       placeholder="Enter your password."
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
                       <Button variant={"outline-success"}>
                           {isLogin ? 'Log in' : 'Register'}
                       </Button>
                   </Col>

               </Form>
           </Card>
        </Container>
    );
};

export default Auth;