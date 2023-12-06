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

TopMedical.tsx - All Medical page (component)
@author David L Whitehurst

*/

import React, {useEffect, useState} from "react";
import MedicalService from "../services/medical.service.ts";
import CreatePrescription from "../types/createprescription.type.ts";
import {Button, Form, Modal} from "react-bootstrap";
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AuthService from "../services/auth.service.ts";

const TopMedical = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // crude refresh
    function refreshPage() {
        window.location.reload();
    }

    // create popup modal
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPrescriptionValues: CreatePrescription = {
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
            expired: formData.get('expired') as string,
            refillNote: formData.get('refillNote') as string,
            manufacturedBy: formData.get('manufacturedBy') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        MedicalService.createPrescription(formPrescriptionValues);
        handleCreateClose();
        refreshPage();
        //goBack();
    };

    const handleCreateClose = () => {
        return setShowCreate(false);
    }

    const showCreatePop = () => {
        return setShowCreate(true);
    }

    const openCreate = () => {
        return showCreatePop();
    }

    useEffect(() => {
        MedicalService.getPrescriptions()
            .then((response) => {
                setPrescriptions(response.data);
            })
    }, [])

    if (!prescriptions) {
        return <div>Loading...</div>;
    }

    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Medical</h1>
                <p>This is where we work with our health and medical needs.</p>
                <h3 className="font-weight-light">Prescriptions
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={openCreate}>New</Button>}</h3>
                <Modal show={showCreate} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Prescription Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>IdentNo</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter ident no" id="identNo" name="identNo"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Size</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter size" id="size" name="size"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Form</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter form" id="form" name="form"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>RxUnit</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Rx unit" id="rxUnit" name="rxUnit"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Quantity</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter quantity" id="quantity" name="quantity"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Pharmacy</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter pharmacy" id="pharmacy" name="pharmacy"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Pharmacy Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter pharmacy phone" id="pharmacyPhone" name="pharmacyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Written</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter when written" id="written" name="written"/>
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Written By</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter written by" id="writtenBy" name="writtenBy"/>
                            </Form.Group>
                            <Form.Group controlId="form11">
                                <Form.Label><b>Filled</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter when filled" id="filled" name="filled"/>
                            </Form.Group>
                            <Form.Group controlId="form12">
                                <Form.Label><b>Expired</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter expiry date" id="expired" name="expired"/>
                            </Form.Group>
                            <Form.Group controlId="form13">
                                <Form.Label><b>Refill Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter refill note" id="refillNote" name="refillNote"/>
                            </Form.Group>
                            <Form.Group controlId="form14">
                                <Form.Label><b>Manufactured By</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter manufactured by" id="manufacturedBy" name="manufacturedBy"/>
                            </Form.Group>
                            <Form.Group controlId="form15">
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter note" id="note" name="note"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={handleCreateClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <PrescriptionDisplay data={prescriptions} />
            </header>
        </div>
    );
};

export default TopMedical;
