import {observer} from "mobx-react-lite";
import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {deleteUser} from "../../http/userAPI";

const DeleteUser = observer(({show, onHide}) => {

    const [id, setId] = useState('')

    const delUser = () => {
        const formData = new FormData()
        formData.append('id', id)

        deleteUser(formData)
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
                    Delete user
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value = {id}
                        onChange={e => setId(e.target.value)}
                        placeholder={"User id to delete"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Close</Button>
                <Button variant={"outline-danger"} onClick={delUser}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteUser;