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

UpdatePassword.tsx - Page to update User with new password (component)
@author David L Whitehurst

*/
import Footer from "./section/Footer.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {isNotExpired} from "../utility/email.utils.ts";
import UserService from "../services/user.service.ts";
import {keysMatchForPasswordReset} from "../utility/key.utils.ts";
const UpdatePassword = () => {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id') || '0';
    const dkey = query.get('dkey') as string;
    const expire = query.get('expire') || '0';

    const [message, setMessage] = useState('');
    const [goodShow, setGoodShow] = useState(false);
    const [badShow, setBadShow] = useState(false);

    const navigate = useNavigate();
    const showUpdateModal = () => {
        setGoodShow(true);
    }
    const showFailModal = () => {
        setBadShow(true);
    }
    const handleUpdateClose = () => {
        setGoodShow(false);
        navigate('/home');
    }
    const handleFailClose = () => {
        setBadShow(false);
        navigate('/home');
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;

        if (isNotExpired(parseInt(expire))) {
            // check dkey
            if (!keysMatchForPasswordReset(dkey)) {
                setMessage("Password reset failed!");
                showFailModal();
            } else {
                // update password
                try {
                    await UserService.updatePassword(parseInt(id), password).then(
                        (response) => {
                            if (response.status === 200) { // Good
                                showUpdateModal();
                            } else { // Bad
                                setMessage("Password not reset! Internal system error!");
                                showFailModal();
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
                            showFailModal();
                        }
                    );
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            // fail out
            setMessage("Password reset ability expired!");
            showFailModal();
        }
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Update with New Password</h1>
                <p className="lead">You are updating your user account with a new password.</p>
            </header>
            <p></p>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label><b>Password</b></Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" defaultValue="" id="password" name="password"/>
                </Form.Group>
                <Button className="buttonMargin" variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {/* EXPIRED or FAIL */}
            <Modal show={badShow} onHide={handleFailClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                    <Button variant="secondary" onClick={handleFailClose}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>
            {/* UPDATE MODAL */}
            <Modal show={goodShow} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success Notification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Password reset!</p>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        Cancel
                    </Button>
                </Modal.Body>
            </Modal>

            <p></p>
            <Footer/>
        </div>
    );
};

export default UpdatePassword;
