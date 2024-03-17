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

import React, {useEffect, useState} from "react";
import LegalService from "../services/legal.service.ts";
import CreateDoc from "../types/createdoc.type.ts";
import {Button, Form, Modal} from "react-bootstrap";
import DocDisplay from "./display/DocDisplay.tsx";
import AuthService from "../services/auth.service.ts";
import "./custom.css";

const TopLegal = () => {
    const [docs, setDocs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshDoc, setRefreshDoc] = useState(0);
    const [tmpName, setTmpName] = useState('');
    const [tmpType, setTmpType] = useState('');
    const [tmpLink, setTmpLink] = useState('');


    // create popup modal
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDocValues: CreateDoc = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            link: formData.get('link') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        try {
            await LegalService.createDoc(formDocValues);
        } catch (error) {
            console.error(error);
        }

        await handleReset();
        closeModal();
        setRefreshDoc(oldVal => oldVal + 1);
    };

    const handleReset = async () => {
        flushTmpState();
    };

    const flushTmpState = () => {
        setTmpName('');
        setTmpType('');
        setTmpLink('');
    }
    const closeModal = () => {
        return setShowModal(false);
    }

    const goModal = () => {
        return setShowModal(true);
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
                <h1 className="display-4">Legal</h1>
                <p>This is where we keep our legal documents.</p>
                <h3 className="font-weight-light">Legal Docs
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={goModal}>New</Button>}</h3>
                <Modal show={showModal} onHide={closeModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>New Legal Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"
                                              title="You can say, the name is health care directive."/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter type" defaultValue={tmpType} id="type" name="type"
                                              title="You can say, the type is google drive"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Link</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter link" defaultValue={tmpLink} id="link" name="link"
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
