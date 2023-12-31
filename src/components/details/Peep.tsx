/*
Copyright 2023 VirtualYou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Peep.tsx - Detail page for single Peep
@author David L Whitehurst

*/

import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PersonalService from "../../services/personal.service.ts";
import Peep from "../../types/peep.type.ts";
import {Button, Form, Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";

const PeepDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [peep, setPeep] = useState<Peep>();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = async () => {
        try {
            await PersonalService.deletePeep(parseInt(param));
        } catch (error) {
            console.error(error);
        }
        handleClose();
        goBack();
    };

    const handleClose = () => {
        return setShowModal(false);
    }

    const showPop = () => {
        return setShowModal(true);
    }

    const openModal = () => {
        return showPop();
    }

    // editor popup modal
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPeepValues: Peep = {
            id: parseInt(param),
            name: formData.get('name') as string,
            phone1: formData.get('phone1') as string,
            phone2: formData.get('phone2') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            note: formData.get('note') as string,
            userKey: userkey
        };
        try {
            await PersonalService.updatePeep(parseInt(param), formPeepValues);
        } catch (error) {
            console.error(error);
        }
        handleEditorClose();
        goBack();
    };

    const handleEditorClose = () => {
        return setShowEdit(false);
    }

    const showEditPop = () => {
        return setShowEdit(true);
    }

    const openEdit = () => {
        return showEditPop();
    }

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        if (!id) return;
        setParam(id);

        PersonalService.getPeep(parseInt(id))
            .then((response) => {
                setPeep(response.data);
            })

    }, []);

    if (!peep) {
        return <div>Loading...</div>;
    }

    const userkey = peep.userKey;
    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Contact Details</h1>
                <p>This is where we show the entire Contact Object</p>
                {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                    <Button className="spacial-button" variant="primary" onClick={openEdit}>Edit</Button>}
                <Button className="spacial-button" variant="secondary" onClick={goBack}>Back</Button>
                <Modal show={showEdit} onHide={handleEditorClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Contact Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" defaultValue={peep.name} name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Phone 1</b></Form.Label>
                                <Form.Control type="text" defaultValue={peep.phone1} name="phone1"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Phone 2</b></Form.Label>
                                <Form.Control type="text" defaultValue={peep.phone2} name="phone2"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control type="text" defaultValue={peep.email} name="email"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Address</b></Form.Label>
                                <Form.Control type="text" defaultValue={peep.address} name="address"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" defaultValue={peep.note} name="note"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={handleEditorClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <div className="detail-div">
                    <div><strong>id: </strong> {param}</div>
                    <div><strong>name:</strong> {peep.name}</div>
                    <div><strong>phone1:</strong> {peep.phone1}</div>
                    <div><strong>phone2:</strong> {peep.phone2}</div>
                    <div><strong>email:</strong> {peep.email}</div>
                    <div><strong>address:</strong> {peep.address}</div>
                    <div><strong>note:</strong> {peep.note}</div>
                    <div><strong>userKey:</strong> {peep.userKey}</div>
                </div>
                {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                    <Button variant="danger" onClick={openModal}>Delete</Button>}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure?</p>
                        <Button variant="primary" onClick={handleOkay}>
                            Okay
                        </Button>&nbsp;
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Body>
                </Modal>
            </header>
        </div>
    );
};

export default PeepDetails;
