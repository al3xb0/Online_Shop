import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {editUser} from "../../http/userAPI";
import {observer} from "mobx-react-lite";

const ChangeUser = observer(({show, onHide}) => {
    const [ids, setIds] = useState('')
    const [emails, setEmails] = useState('')
    const [passwords, setPasswords] = useState('')
    const [roles, setRoles] = useState('')

    const editUserInfo = () => {
        const formData = new FormData();
        formData.append('id', ids)
        if (emails) {formData.append('email', emails)}
        if (passwords) {formData.append('password', passwords)}
        if (roles) {formData.append('role', roles)}
        editUser(formData)
            .then(data => {
                onHide()
                window.location.reload()
            })
            .catch((e) => alert(e.response.data.message))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change user information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={ids}
                        onChange={e => setIds(e.target.value)}
                        className={"mt-2"}
                        placeholder={"Id"}
                    />
                </Form>
                <Form>
                    <Form.Control
                        value={emails}
                        onChange={e => setEmails(e.target.value)}
                        className={"mt-2"}
                        placeholder={"Email"}
                    />
                </Form>
                <Form>
                    <Form.Control
                        value={passwords}
                        onChange={e => setPasswords(e.target.value)}
                        className={"mt-2"}
                        placeholder={"Password"}
                        type={"password"}
                    />
                </Form>
                <Form>
                    <Form.Control
                        value={roles}
                        onChange={e => setRoles(e.target.value)}
                        className={"mt-2"}
                        placeholder={"Role"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="outline-danger">Close</Button>
                <Button onClick={editUserInfo} variant='outline-success'>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ChangeUser;