import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Context} from "../../index";
import {deleteType, fetchTypes} from "../../http/deviceAPI";
import {Button, Dropdown, Modal} from "react-bootstrap";

const DeleteType = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const delType = () => {
        const formData = new FormData()
        formData.append('id', device.selectedType.id)

        deleteType(formData)
            .then(data => {
                onHide()
                window.location.reload()
            })
            .catch((e) => alert(e.response.data.message))
    }

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
    }, [])

    return (
        <Modal
            show = {show}
            onHide = {onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-3">
                    <Dropdown.Toggle>{device.selectedType.name || 'Choose a type'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type =>
                            <Dropdown.Item onClick={() => device.setSelectedType(type)} key = {type.id}>
                                {type.name}
                            </Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Close</Button>
                <Button variant={"outline-danger"} onClick={delType}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;