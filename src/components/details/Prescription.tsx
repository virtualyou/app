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

Prescription.tsx - Detail page for single Prescription
@author David L Whitehurst

*/

import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MedicalService from "../../services/medical.service.ts";
import Prescription from "../../types/prescription.type.ts";
import {Button, Form, Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PrescriptionDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [rx, setRx] = useState<Prescription>();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [writtenDate, setWrittenDate] = useState<Date | null>(new Date());
    const [filledDate, setFilledDate] = useState<Date | null>(new Date());
    const [expiresDate, setExpiresDate] = useState<Date | null>(new Date());

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = async () => {
        try {
            await MedicalService.deletePrescription(parseInt(param));
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
        const formPrescriptionValues: Prescription = {
            id: parseInt(param),
            name: formData.get('name') as string,
            identNo: formData.get('identNo') as string,
            size: formData.get('size') as string,
            form: formData.get('form') as string,
            rxUnit: formData.get('rxUnit') as string,
            quantity: formData.get('quantity') as string,
            pharmacy: formData.get('pharmacy') as string,
            pharmacyPhone: formData.get('pharmacyPhone') as string,
            written: formData.get('written') as string,
            writtenBy: formData.get('writtenBy') as string,
            filled: formData.get('filled') as string,
            expires: formData.get('expires') as string,
            refillNote: formData.get('refillNote') as string,
            manufacturedBy: formData.get('manufacturedBy') as string,
            note: formData.get('note') as string,
            userKey: userkey
        };
        try {
            await MedicalService.updatePrescription(parseInt(param), formPrescriptionValues);
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

        MedicalService.getPrescription(parseInt(id))
            .then((response) => {
                setRx(response.data);
            })

    }, []);

    if (!rx) {
        return <div>Loading...</div>;
    }

    const userkey = rx.userKey;
    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Prescription Details</h1>
                <p>This is where we show the entire Prescription Object</p>
                {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                    <Button className="spacial-button" variant="primary" onClick={openEdit}>Edit</Button>}
                <Button className="spacial-button" variant="secondary" onClick={goBack}>Back</Button>
                <Modal show={showEdit} onHide={handleEditorClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Prescription Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.name} name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>IdentNo</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.identNo} name="identNo"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Size</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.size} name="size"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Form</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.form} name="form"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>RxUnit</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.rxUnit} name="rxUnit"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Quantity</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.quantity} name="quantity"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Pharmacy</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.pharmacy} name="pharmacy"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Pharmacy Phone</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.pharmacyPhone} name="pharmacyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Written</b></Form.Label>
                                <DatePicker
                                    selected={writtenDate}
                                    onChange={(date) => setWrittenDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Written By</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.writtenBy} name="writtenBy"/>
                            </Form.Group>
                            <Form.Group controlId="form11">
                                <Form.Label><b>Filled</b></Form.Label>
                                <DatePicker
                                    selected={filledDate}
                                    onChange={(date) => setFilledDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group controlId="form12">
                                <Form.Label><b>Expires</b></Form.Label>
                                <DatePicker
                                    selected={expiresDate}
                                    onChange={(date) => setExpiresDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group controlId="form13">
                                <Form.Label><b>Refill Note</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.refillNote} name="refillNote"/>
                            </Form.Group>
                            <Form.Group controlId="form14">
                                <Form.Label><b>Manufactured By</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.manufacturedBy} name="manufacturedBy"/>
                            </Form.Group>
                            <Form.Group controlId="form15">
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" defaultValue={rx.note} name="note"/>
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
                    <div><strong>identNo:</strong> {rx.name}</div>
                    <div><strong>size:</strong> {rx.size}</div>
                    <div><strong>form:</strong> {rx.form}</div>
                    <div><strong>rxUnit:</strong> {rx.rxUnit}</div>
                    <div><strong>quantity:</strong> {rx.quantity}</div>
                    <div><strong>pharmacy:</strong> {rx.pharmacy}</div>
                    <div><strong>pharmacyPhone:</strong> {rx.pharmacyPhone}</div>
                    <div><strong>written:</strong> {rx.written}</div>
                    <div><strong>writtenBy:</strong> {rx.writtenBy}</div>
                    <div><strong>filled:</strong> {rx.filled}</div>
                    <div><strong>expires:</strong> {rx.expires}</div>
                    <div><strong>refillNote:</strong> {rx.refillNote}</div>
                    <div><strong>manufacturedBy:</strong> {rx.manufacturedBy}</div>
                    <div><strong>note:</strong> {rx.note}</div>
                    <div><strong>userKey:</strong> {rx.userKey}</div>
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

export default PrescriptionDetails;
