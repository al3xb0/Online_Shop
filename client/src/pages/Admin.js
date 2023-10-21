import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";
import DeleteDevice from "../components/modals/DeleteDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [typeDelVisible, setTypeDelVisible] = useState(false)
    const [brandDelVisible, setBrandDelVisible] = useState(false)
    const [deviceDelVisible, setDeviceDelVisible] = useState(false)


    return (
        <Container className="d-flex flex-column ">
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setTypeVisible(true)}>Add type</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setBrandVisible(true)}>Add brand</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setDeviceVisible(true)}>Add device</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setTypeDelVisible(true)}>Delete type</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setBrandDelVisible(true)}>Delete brand</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setDeviceDelVisible(true)}>Delete device</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <DeleteType show={typeDelVisible} onHide={() => setTypeDelVisible(false)}/>
            <DeleteBrand show={brandDelVisible} onHide={() => setBrandDelVisible(false)}/>
            <DeleteDevice show={deviceDelVisible} onHide={() => setDeviceDelVisible(false)}/>
        </Container>
    );
};

export default Admin;