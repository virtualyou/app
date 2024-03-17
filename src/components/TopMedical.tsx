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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom.css";

const TopMedical = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshRx, setRefreshRx] = useState(0);
    const [writtenDate, setWrittenDate] = useState<Date | null>(null);
    const [filledDate, setFilledDate] = useState<Date | null>(null);
    const [expiresDate, setExpiresDate] = useState<Date | null>(null);
    const [tmpName, setTmpName] = useState('');
    const [tmpIdentNo, setTmpIdentNo] = useState('');
    const [tmpSize, setTmpSize] = useState('');
    const [tmpForm, setTmpForm] = useState('');
    const [tmpRxUnit, setTmpRxUnit] = useState('');
    const [tmpQuantity, setTmpQuantity] = useState('');
    const [tmpPharmacy, setTmpPharmacy] = useState('');
    const [tmpPharmacyPhone, setTmpPharmacyPhone] = useState('');
    const [tmpWrittenBy, setTmpWrittenBy] = useState('');
    const [tmpRefillNote, setTmpRefillNote] = useState('');
    const [tmpManufacturedBy, setTmpManufacturedBy] = useState('');
    const [tmpNote, setTmpNote] = useState('');

    // create popup modal
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let written;
        let filled;
        let expires;

        if (formData.get('written') === "") {
            written = null;
        } else {
            written = formData.get('written') as string;
        }

        if (formData.get('filled') === "") {
            filled = null;
        } else {
            filled = formData.get('filled') as string;
        }

        if (formData.get('expires') === "") {
            expires = null;
        } else {
            expires = formData.get('expires') as string;
        }

        const formPrescriptionValues: CreatePrescription = {
            name: formData.get('name') as string,
            identNo: formData.get('identNo') as string,
            size: formData.get('size') as string,
            form: formData.get('form') as string,
            rxUnit: formData.get('rxUnit') as string,
            quantity: formData.get('quantity') as string,
            pharmacy: formData.get('pharmacy') as string,
            pharmacyPhone: formData.get('pharmacyPhone') as string,
            written: written,
            writtenBy: formData.get('writtenBy') as string,
            filled: filled,
            expires: expires,
            refillNote: formData.get('refillNote') as string,
            manufacturedBy: formData.get('manufacturedBy') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        try {
            await MedicalService.createPrescription(formPrescriptionValues);
        } catch (error) {
            console.error(error);
        }

        await handleReset();
        closeModal();
        setRefreshRx(oldVal => oldVal +1);
    };

    const handleReset = async () => {
        flushTmpState();
    };

    const flushTmpState = () => {
        setTmpName('');
        setTmpIdentNo('');
        setTmpSize('');
        setTmpForm('');
        setTmpRxUnit('');
        setTmpQuantity('');
        setTmpPharmacy('');
        setTmpPharmacyPhone('');
        setTmpWrittenBy('');
        setTmpRefillNote('');
        setTmpManufacturedBy('');
        setTmpNote('');
    }
    const closeModal = () => {
        return setShowModal(false);
    }

    const goModal = () => {
        return setShowModal(true);
    }

    useEffect(() => {
        MedicalService.getPrescriptions()
            .then((response) => {
                setPrescriptions(response.data);
            })
    }, [refreshRx])

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
                        <Button className="spacial-button" variant="primary" onClick={goModal}>New</Button>}</h3>
                <Modal show={showModal} onHide={closeModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>New Prescription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>IdentNo</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter ident no" defaultValue={tmpIdentNo} id="identNo" name="identNo"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Size</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter size" defaultValue={tmpSize} id="size" name="size"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Form</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter form" defaultValue={tmpForm} id="form" name="form"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>RxUnit</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Rx unit" defaultValue={tmpRxUnit} id="rxUnit" name="rxUnit"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Quantity</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter quantity" defaultValue={tmpQuantity} id="quantity" name="quantity"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Pharmacy</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter pharmacy" defaultValue={tmpPharmacy} id="pharmacy" name="pharmacy"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Pharmacy Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter pharmacy phone" defaultValue={tmpPharmacyPhone} id="pharmacyPhone" name="pharmacyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="written">
                                <Form.Label><b>Written</b></Form.Label>
                                <DatePicker
                                    selected={writtenDate}
                                    onChange={(date) => setWrittenDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Written By</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter written by" defaultValue={tmpWrittenBy} id="writtenBy" name="writtenBy"/>
                            </Form.Group>
                            <Form.Group controlId="filled">
                                <Form.Label><b>Filled</b></Form.Label>
                                <DatePicker
                                    selected={filledDate}
                                    onChange={(date) => setFilledDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group controlId="expires">
                                <Form.Label><b>Expires</b></Form.Label>
                                <DatePicker
                                    selected={expiresDate}
                                    onChange={(date) => setExpiresDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Refill Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter refill note" defaultValue={tmpRefillNote} id="refillNote" name="refillNote"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Manufactured By</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter manufactured by" defaultValue={tmpManufacturedBy} id="manufacturedBy" name="manufacturedBy"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter note" defaultValue={tmpNote} id="note" name="note"/>
                            </Form.Group>
                            <Button className="buttonMargin" variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={closeModal}>
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
