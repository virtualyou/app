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

import React, {useEffect, useState} from "react";
import CreatePeep from "../types/createpeep.type.ts";
import PersonalService from "../services/personal.service.ts";
import {Button, Form, Modal} from "react-bootstrap";
import PeepDisplay from "./display/PeepDisplay.tsx";
import AuthService from "../services/auth.service.ts";
import "./custom.css";

const TopPersonal = () => {
    const [peeps, setPeeps] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshPeep, setRefreshPeep] = useState(0);
    const [tmpName, setTmpName] = useState('');
    const [tmpPhone1, setTmpPhone1] = useState('');
    const [tmpPhone2, setTmpPhone2] = useState('');
    const [tmpEmail, setTmpEmail] = useState('');
    const [tmpAddress, setTmpAddress] = useState('');
    const [tmpNote, setTmpNote] = useState('');


    const handleReset = async () => {
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

    const goModal = () => {
        return setShowModal(true);
    }

    // create popup modal
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        try {
            await PersonalService.createPeep(formPeepValues);
        } catch (error) {
            console.error(error);
        }
        await handleReset();
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
                        <Button className="spacial-button" variant="primary" onClick={goModal}>New</Button>}

                    <Modal show={showModal} onHide={closeModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Phone1</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter phone1" defaultValue={tmpPhone1} id="phone1" name="phone1"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Phone2</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter phone2" defaultValue={tmpPhone2} id="phone2" name="phone2"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter email" defaultValue={tmpEmail} id="email" name="email"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter address" defaultValue={tmpAddress} id="address" name="address"/>
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
                <PeepDisplay data={peeps} />
            </header>
        </div>
    );
};

export default TopPersonal;
