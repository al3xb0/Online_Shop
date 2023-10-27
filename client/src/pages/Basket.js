import React, { useEffect } from 'react';
import { useContext } from 'react';
import {deleteFromBasket, getBasket} from '../http/deviceAPI';
import {Button, Card, Col, Container, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import {Context} from "../index";

const Basket = observer(() => {
    const {device} = useContext(Context)
    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [])

    const refreshPage = ()=>{
        window.location.reload();
    }
    const _delete = (id) => {
        deleteFromBasket(id).then(response => alert(`Device deleted from basket`)).then(response => refreshPage())

    }

    const _buy = (id) => {
        deleteFromBasket(id).then(response => alert(`You bought this device!`)).then(response => refreshPage())

    }


    let prices = 0;
    {device.basket.map(price =>
        prices += price.device.price
    )}
    return (
        <Container
            className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
        >
            <h1 className="pb-2">Basket</h1>

            <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
                <h1 className="align-self-end" >Summary:</h1>
                <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> $ </span></h3>
            </Card>
            {device.basket.map(product =>
                <Card className="d-flex w-100 p-2 justify-content-center mb-2"  key={product.id}>

                    <Row>
                        <Col md="2" className="d-inline-flex flex-row">
                            <div className="flex-row" >
                                <img src={process.env.REACT_APP_API_URL + product.device.img} alt="img not found" height={100}  />
                            </div>
                        </Col>
                        <Col  className="d-flex flex-row">
                            <div className="flex-row">
                                <h1 className="ms-3">{product.device.name}</h1>
                            </div>
                        </Col>
                        <Col  className="d-flex flex-row justify-content-end">
                            <div className="flex-row">
                                <h2 className="font-weight-light">{product.device.price} $ </h2>
                            </div>
                        </Col>
                        <Col  className="d-flex flex-row justify-content-end">
                            <div className="flex-row">
                                <Button className="bg-success" onClick={() => _buy(product.id)}> Buy </Button>
                            </div>
                            <div className="flex-row ms-2">
                                <Button className="bg-danger" onClick={() => _delete(product.id)}> Delete </Button>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}

            <Row> <Button className="bg-success" >Buy all</Button> </Row>



        </Container>
    );

});

export default Basket;