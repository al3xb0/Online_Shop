import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from "react-router-dom";
import {addRating, checkRating, fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import RatingStars from "../components/modals/RatingStars";

const DevicePage = () => {
    const {user} = useContext(Context);
    const [device, setDevice] = useState({info: []});
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setIsAccessRating] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
        if(user.isAuth) {
            checkRating({deviceId: id}).then(res => setIsAccessRating(res.allow));
        }
    }, [])

    const ratingChanged = (rate) => {
        addRating({
            rate,
            deviceId: id
        }).then(res => {
            setResRate(res);
            window.location.reload()
        });

    };


    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    {device.img && <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>}
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="d-flex align-items-center justify-content-center">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 200, height: 200, backgroundSize: 'cover', fontSize: 64}}>
                            {device.rating || 0}
                        </div>
                        <div
                            className="d-flex align-items-center justify-content-center"
                        >
                            <RatingStars
                                ratingChanged={ratingChanged}
                                ratingVal={device?.rating || 0}
                                isAuth={user.isAuth}
                                isAccessRating={isAccessRating}
                            />
                            {resRate}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price}</h3>
                        <Button variant={"outline-dark"}>Add to cart</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Description</h1>
                {device.info.map((info, index) =>
                    <Row key = {info.id} style={{background:index %2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );
};

export default DevicePage;