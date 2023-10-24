import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";
import DeleteDevice from "../components/modals/DeleteDevice";
import DeleteUser from "../components/modals/DeleteUser";
import {useNavigate} from "react-router-dom";
import {ADMIN_USER_ROUTE} from "../utils/consts";
import EditUser from "../components/modals/EditUser";
import EditDevice from "../components/modals/EditDevice";

const Admin = () => {

    const navigate = useNavigate()

    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [typeDelVisible, setTypeDelVisible] = useState(false)
    const [deviceEditVisible, setDeviceEditVisible] = useState(false)
    const [brandDelVisible, setBrandDelVisible] = useState(false)
    const [deviceDelVisible, setDeviceDelVisible] = useState(false)
    const [userEditVisible, setUserEditVisible] = useState(false)
    const [userDelVisible, setUserDelVisible] = useState(false)


    return (
        <Container className="d-flex flex-column ">
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setTypeVisible(true)}>Add type</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setBrandVisible(true)}>Add brand</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setDeviceVisible(true)}>Add device</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setDeviceEditVisible(true)}>Edit device</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setUserEditVisible(true)}>Edit user</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setTypeDelVisible(true)}>Delete type</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setBrandDelVisible(true)}>Delete brand</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setDeviceDelVisible(true)}>Delete device</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => setUserDelVisible(true)}>Delete user</Button>
            <Button variant={"outline-dark"} className="mt-3" onClick={() => navigate(ADMIN_USER_ROUTE)}>All users</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <DeleteType show={typeDelVisible} onHide={() => setTypeDelVisible(false)}/>
            <DeleteBrand show={brandDelVisible} onHide={() => setBrandDelVisible(false)}/>
            <DeleteDevice show={deviceDelVisible} onHide={() => setDeviceDelVisible(false)}/>
            <DeleteUser show={userDelVisible} onHide={() => setUserDelVisible(false)}/>
            <EditUser show={userEditVisible} onHide={() => setUserEditVisible(false)}/>
            <EditDevice show={deviceEditVisible} onHide={() => setDeviceEditVisible(false)}/>
        </Container>
    );
};

export default Admin;