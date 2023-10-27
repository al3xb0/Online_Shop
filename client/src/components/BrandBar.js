import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    const getAllDevices = () => {
        device.setSelectedBrand("all");
    }

    return (
        <Row>
            <Col md={1} className='mt-1'>
                <Card
                    style={{cursor: 'pointer'}}
                    className="p-1 d-inline-flex mx-2"
                    onClick={getAllDevices}
                    border={"all" === device.selectedBrand ? 'primary' : 'light'}
                >
                    All
                </Card>
            </Col>
            {device.brands.map(brand =>
                <Col md={1} key={brand.id} className='mt-1'>
                    <Card
                        style={{cursor: 'pointer'}}
                        className="p-1 d-inline-flex mx-2"
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;