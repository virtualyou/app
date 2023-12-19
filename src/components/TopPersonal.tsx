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

TopPersonal.tsx - All Personal page (component)
@author David L Whitehurst

*/

import React, {useEffect, useRef, useState} from "react";
import CreatePeep from "../types/createpeep.type.ts";
import PersonalService from "../services/personal.service.ts";
import {Button, Form, Modal} from "react-bootstrap";
import PeepDisplay from "./display/PeepDisplay.tsx";
import AuthService from "../services/auth.service.ts";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./custom.css";

const PEEP_TALK = import.meta.env.VITE_APP_BASEPATH + "/speech/v1/assist/create/contact"
const TopPersonal = () => {
    const [peeps, setPeeps] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshPeep, setRefreshPeep] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    const [tmpName, setTmpName] = useState('');
    const [tmpPhone1, setTmpPhone1] = useState('');
    const [tmpPhone2, setTmpPhone2] = useState('');
    const [tmpEmail, setTmpEmail] = useState('');
    const [tmpAddress, setTmpAddress] = useState('');
    const [tmpNote, setTmpNote] = useState('');

// declare speech recognition
    const commands = [
        {
            command: 'The name is *',
            callback: (name: string) => setTmpName(name)
        },
        {
            command: 'The phone number one is *',
            callback: (phone1: string) => setTmpPhone1(phone1)
        },
        {
            command: 'The phone number two is *',
            callback: (phone2: string) => setTmpPhone2(phone2)
        },
        {
            command: 'The email is *',
            callback: (email: string) => setTmpEmail(email)
        },
        {
            command: 'The address is *',
            callback: (address: string) => setTmpAddress(address)
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

    const playQuip = () => {
        const audio = new Audio(PEEP_TALK);
        audio.play(); // must be asynchronous
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
        setTmpPhone1('');
        setTmpPhone2('');
        setTmpEmail('');
        setTmpAddress('');
        setTmpNote('');
    }
    const closeModal = () => {
        return setShowModal(false);
    }

    // create popup modal
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPeepValues: CreatePeep = {
            name: formData.get('name') as string,
            phone1: formData.get('phone1') as string,
            phone2: formData.get('phone2') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        PersonalService.createPeep(formPeepValues);
        handleReset();
        closeModal();
        setRefreshPeep(oldVal => oldVal +1);
    };

    useEffect(() => {
        PersonalService.getPeeps()
            .then((response) => {
                setPeeps(response.data);
            })
    }, [refreshPeep])

    if (!peeps) {
        return <div>Loading...</div>;
    }

    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Personal</h1>
                <p>This is where we keep things closest to us.</p>
                <h3 className="font-weight-light">Contacts</h3>

                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={playQuip}>New</Button>}

                    <Modal show={showModal} onHide={closeModal} ref={microphoneRef} onShow={startListener}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Contact</Modal.Title>
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
                                <Form.Label><b>Phone1</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter phone1" defaultValue={tmpPhone1} id="phone1" name="phone1"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Phone2</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter phone2" defaultValue={tmpPhone2} id="phone2" name="phone2"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter email" defaultValue={tmpEmail} id="email" name="email"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter address" defaultValue={tmpAddress} id="address" name="address"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
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
                <PeepDisplay data={peeps} />
            </header>
        </div>
    );
};

export default TopPersonal;
