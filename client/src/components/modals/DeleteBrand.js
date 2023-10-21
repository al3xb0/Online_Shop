import React, {useContext, useEffect, useState} from "react";
import {deleteBrand, fetchBrands} from "../../http/deviceAPI";
import {Button, Dropdown, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteBrand = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const delBrand = () => {
        const formData = new FormData()
        formData.append('id', device.selectedBrand.id)

        deleteBrand(formData)
            .then(data => {
                onHide()
                window.location.reload()
            })
            .catch((e) => alert(e.response.data.message))
    }

    useEffect(() => {
        fetchBrands().then(data => device.setBrands(data))
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
                    Delete brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-3">
                    <Dropdown.Toggle>{device.selectedBrand.name || 'Choose a brand'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand =>
                            <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key = {brand.id}>
                                {brand.name}
                            </Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={onHide}>Close</Button>
                <Button variant={"outline-danger"} onClick={delBrand}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteBrand;