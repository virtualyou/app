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

TopLegal.tsx - All Legal page (component)
@author David L Whitehurst

*/

import React, {useEffect, useRef, useState} from "react";
import LegalService from "../services/legal.service.ts";
import CreateDoc from "../types/createdoc.type.ts";
import {Button, Form, Modal} from "react-bootstrap";
import DocDisplay from "./display/DocDisplay.tsx";
import AuthService from "../services/auth.service.ts";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./custom.css";

const DOC_TALK = import.meta.env.VITE_APP_BASEPATH + "/speech/v1/assist/create/doc"
const TopLegal = () => {
    const [docs, setDocs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshDoc, setRefreshDoc] = useState(0);
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    const [tmpName, setTmpName] = useState('');
    const [tmpType, setTmpType] = useState('');

    // create popup modal
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDocValues: CreateDoc = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            link: formData.get('link') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        LegalService.createDoc(formDocValues);
        closeModal();
        setRefreshDoc(oldVal => oldVal + 1);
    };

// declare speech recognition
    const commands = [
        {
            command: 'The name is *',
            callback: (name: string) => setTmpName(name)
        },
        {
            command: 'The type is *',
            callback: (type: string) => setTmpType(type)
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
        const audio = new Audio(DOC_TALK);
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
        setTmpType('');
    }
    const closeModal = () => {
        return setShowModal(false);
    }

    useEffect(() => {
        LegalService.getDocs()
            .then((response) => {
                setDocs(response.data);
            })
    }, [refreshDoc])

    if (!docs) {
        return <div>Loading...</div>;
    }

    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Medical</h1>
                <p>This is where we keep our legal documents.</p>
                <h3 className="font-weight-light">Legal Docs
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={playQuip}>New</Button>}</h3>
                <Modal show={showModal} onHide={closeModal} ref={microphoneRef} onShow={startListener}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Legal Document</Modal.Title>
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
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"
                                              title="You can say, the name is health care directive."/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter type" defaultValue={tmpType} id="type" name="type"
                                              title="You can say, the type is google drive"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Link</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter link" id="link" name="link"
                                              title="We cannot take this verbally. We suggest you paste the link here."/>
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
                <DocDisplay data={docs}/>
            </header>
        </div>
    );
};

export default TopLegal;
