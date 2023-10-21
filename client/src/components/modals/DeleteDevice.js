import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../../index";
import {deleteDevice, fetchBrands} from "../../http/deviceAPI";
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

const DeleteDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const [id, setId] = useState('')

    const delDevice = () => {
        const formData = new FormData()
        formData.append('id', id)

        deleteDevice(formData)
            .then(data => {
                setId('')
                onHide()
                window.location.reload()
            })
            .catch((e) => alert(e.response.data.message))
    }


    return (
        <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value = {id}
                        onChange={e => setId(e.target.value)}
                        placeholder={"Device id to delete"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Close</Button>
                <Button variant={"outline-danger"} onClick={delDevice}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteDevice;