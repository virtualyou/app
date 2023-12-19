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

import React, {useEffect, useRef, useState} from "react";
import MedicalService from "../services/medical.service.ts";
import CreatePrescription from "../types/createprescription.type.ts";
import {Button, Form, Modal} from "react-bootstrap";
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AuthService from "../services/auth.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./custom.css";

const RX_TALK = import.meta.env.VITE_APP_BASEPATH + "/speech/v1/assist/create/prescription"
const TopMedical = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshRx, setRefreshRx] = useState(0);
    const [writtenDate, setWrittenDate] = useState<Date | null>(new Date());
    const [filledDate, setFilledDate] = useState<Date | null>(new Date());
    const [expiresDate, setExpiresDate] = useState<Date | null>(new Date());
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
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
            expires: formData.get('expires') as string,
            refillNote: formData.get('refillNote') as string,
            manufacturedBy: formData.get('manufacturedBy') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        MedicalService.createPrescription(formPrescriptionValues);
        closeModal();
        setRefreshRx(oldVal => oldVal +1);
    };

// declare speech recognition
    const commands = [
        {
            command: 'The name is *',
            callback: (name: string) => setTmpName(name)
        },
        {
            command: 'The ident number is *',
            callback: (identNo: string) => setTmpIdentNo(identNo)
        },
        {
            command: 'The size is *',
            callback: (size: string) => setTmpSize(size)
        },
        {
            command: 'The form is *',
            callback: (form: string) => setTmpForm(form)
        },
        {
            command: 'The prescription unit is *',
            callback: (rxUnit: string) => setTmpRxUnit(rxUnit)
        },
        {
            command: 'The quantity is *',
            callback: (quantity: string) => setTmpQuantity(quantity)
        },
        {
            command: 'The pharmacy is *',
            callback: (pharmacy: string) => setTmpPharmacy(pharmacy)
        },
        {
            command: 'The pharmacy phone is *',
            callback: (pharmacyPhone: string) => setTmpPharmacyPhone(pharmacyPhone)
        },
        {
            command: 'The prescription was written by *',
            callback: (writtenBy: string) => setTmpWrittenBy(writtenBy)
        },
        {
            command: 'The refill note is *',
            callback: (refillNote: string) => setTmpRefillNote(refillNote)
        },
        {
            command: 'The prescription was manufactured by *',
            callback: (manufacturedBy: string) => setTmpManufacturedBy(manufacturedBy)
        },
        {
            command: 'The note is *',
            callback: (note: string) => setTmpNote(note)
        },
    ]

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({commands});

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="mircophone-container">
                Browser does not Support Speech Recognition.
            </div>
        );
    }

    const playQuip = async () => {
        const audio = new Audio(RX_TALK);
        await audio.play(); // must be asynchronous
        audio.onended = function() {
            setShowModal(true);
        };
    }

    const startListener = () => {
        flushTmpState();
        resetTranscript();
        setIsListening(true);
        // @ts-ignore
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };
    const stopListener = () => {
        setIsListening(false);
        // @ts-ignore
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopListener();
        resetTranscript();
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
                        <Button className="spacial-button" variant="primary" onClick={playQuip}>New</Button>}</h3>
                <Modal show={showModal} onHide={closeModal} ref={microphoneRef} onShow={startListener}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Prescription</Modal.Title>
                        {isListening ? (
                            <div className="led-green" ref={microphoneRef} onClick={stopListener}>
                            </div>
                        ) : (
                            <div className="led-red" ref={microphoneRef} onClick={startListener}>
                            </div>
                        )}
                        <div>{transcript}</div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>IdentNo</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter ident no" defaultValue={tmpIdentNo} id="identNo" name="identNo"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Size</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter size" defaultValue={tmpSize} id="size" name="size"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Form</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter form" defaultValue={tmpForm} id="form" name="form"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>RxUnit</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter Rx unit" defaultValue={tmpRxUnit} id="rxUnit" name="rxUnit"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Quantity</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter quantity" defaultValue={tmpQuantity} id="quantity" name="quantity"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Pharmacy</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter pharmacy" defaultValue={tmpPharmacy} id="pharmacy" name="pharmacy"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Pharmacy Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter pharmacy phone" defaultValue={tmpPharmacyPhone} id="pharmacyPhone" name="pharmacyPhone"/>
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
                                <Form.Control type="text" placeholder="Enter written by" defaultValue={tmpWrittenBy} id="writtenBy" name="writtenBy"/>
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
                                <Form.Control type="text" placeholder="Enter refill note" defaultValue={tmpRefillNote} id="refillNote" name="refillNote"/>
                            </Form.Group>
                            <Form.Group controlId="form14">
                                <Form.Label><b>Manufactured By</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter manufactured by" defaultValue={tmpManufacturedBy} id="manufacturedBy" name="manufacturedBy"/>
                            </Form.Group>
                            <Form.Group controlId="form15">
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
