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

RenewPassword.tsx - Admin dashboard page (component)
@author David L Whitehurst

*/
import {Button, Form, Modal} from "react-bootstrap";
import Footer from "./section/Footer.tsx";
import React, {useState} from "react";
import {TempService} from "../services/temp.service.ts";
import MailService from "../services/mail.service.ts";
import {useNavigate} from "react-router-dom";
import PasswordRenewFormValues from "../types/passwordrenewformvalues.type.ts";

const RenewPassword = () => {
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSentModal, setShowSentModal] = useState(false);

    const navigate = useNavigate();
    const showGoodModal = () => {
        setShowSentModal(true);
    }
    const showNoUserModal = () => {
        setShowModal(true);
    }
    const refreshPage = () => {
        window.location.reload();
    }

    const handleSentClose = () => {
        setShowSentModal(false);
        navigate('/home');
    }
    const handleClose = () => {
        setShowModal(false);
        refreshPage();
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        try {
            const myInstance = new TempService();

            await myInstance.getUserByEmail(email).then(
                (response) => {
                    if (response.data.length === 0) { // NO USER EXISTS
                        showNoUserModal();
                    } else { // ONE USER EXISTS
                        const formPasswordValues: PasswordRenewFormValues = {
                            email: email,
                            fullname: response.data[0].fullname as string,
                            username: response.data[0].username as string,
                            id: response.data[0].id as number,
                        };
                        // MAIL
                        MailService.emailPasswordReset(formPasswordValues);
                        showGoodModal();
                    }
                },
                error => {
                    let resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log("resMessage=" + resMessage);
                    setMessage(resMessage);
                    showNoUserModal();
                }
            );
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Let's Create a New Password</h1>
                <p className="lead">We can use your email to do this.</p>
            </header>
            <p></p>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Email</b></Form.Label>
                    <Form.Control type="text" placeholder="Enter email" defaultValue="" id="email" name="email"/>
                </Form.Group>
                <Button className="buttonMargin" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {/* NO USER MODAL */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
            {/* SENT MODAL */}
            <Modal show={showSentModal} onHide={handleSentClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Email Sent!</p>
                    <Button variant="secondary" onClick={handleSentClose}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
            <p></p>
            <p></p>
            <Footer/>
        </div>
    );
};

export default RenewPassword;
