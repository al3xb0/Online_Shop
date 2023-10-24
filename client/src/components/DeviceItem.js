import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const navigate = useNavigate()


    return (
        <Col md={3} className="mt-3" onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 d-flex justify-content-between align-items-center">
                    <div className="mt-3">
                        <div className="text-black-50">{device && device.brand.name}</div>
                    </div>
                    <div className="mt-2 d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={16} height={16}/>
                    </div>
                </div>
                <div>{device.name}<br/>{device.price}$</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;