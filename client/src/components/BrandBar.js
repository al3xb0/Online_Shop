import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row>
            {device.brands.map(brand =>
                <Col md={1} key={brand.id}>
                    <Card
                        style={{cursor: 'pointer'}}
                        className="p-3 d-inline-flex"
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;