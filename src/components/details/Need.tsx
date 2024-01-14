/*
 * Copyright 2023 VirtualYou
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Need.tsx - Detail page for single Need
 * @author David L Whitehurst
 */

import './custom.css';
import type React from 'react';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import AdministrationService from "../../services/administration.service.ts";
import {Button, Form, Modal} from 'react-bootstrap';
import Need from '../../types/need.type.ts';
import {useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
import "react-datepicker/dist/react-datepicker.css";

const NeedDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [need, setNeed] = useState<Need>();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = async () => {
        try {
            await AdministrationService.deleteNeed(parseInt(param));
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
        const formNeedValues: Need = {
            id: parseInt(param),
            name: formData.get('name') as string,
            quantity: parseInt(formData.get('quantity') as string),
            unit: formData.get('unit') as string,
            urgency: formData.get('urgency') as string,
            note: formData.get('note') as string,
            userKey: userkey
        };
        try {
            await AdministrationService.updateNeed(parseInt(param), formNeedValues);
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

        AdministrationService.getNeed(parseInt(id))
            .then((response) => {
                setNeed(response.data);
            })

    }, []);

    if (!need) {
        return <div>Loading...</div>;
    }

    const userkey = need.userKey;
    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Need Details</h1>
                <p>This is where we show the entire Need Object</p>
                {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                    <Button className="spacial-button" variant="primary" onClick={openEdit}>Edit</Button>}
                <Button className="spacial-button" variant="secondary" onClick={goBack}>Back</Button>
                <Modal show={showEdit} onHide={handleEditorClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Need Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" defaultValue={need.name} name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Quantity</b></Form.Label>
                                <Form.Control type="text" defaultValue={need.quantity} name="quantity"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Unit</b></Form.Label>
                                <Form.Control type="text" defaultValue={need.unit} name="unit"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Urgency</b></Form.Label>
                                <Form.Control type="text" defaultValue={need.urgency} name="urgency"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" defaultValue={need.note} name="note"/>
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
                    <div><strong>name:</strong> {need.name}</div>
                    <div><strong>quantity:</strong> {need.quantity}</div>
                    <div><strong>unit:</strong> {need.unit}</div>
                    <div><strong>urgency:</strong> {need.urgency}</div>
                    <div><strong>note:</strong> {need.note}</div>
                    <div><strong>userKey:</strong> {need.userKey}</div>
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

export default NeedDetails;
