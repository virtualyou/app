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

Profile.tsx - Profile (component)
@author David L Whitehurst

*/

import AuthService from "../services/auth.service";
import './custom.css';
// import {Link} from "react-router-dom";
import React, {useState} from "react";
import MailService from "../services/mail.service.ts";
import {Button, Form, Modal} from "react-bootstrap";
import InviteFormValues from "../types/formvalues.type.ts";
import Agent from "./helper/Agent.tsx";
import Monitor from "./helper/Monitor.tsx";

const Profile = () => {
    const [isOwner, setIsOwner] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [showMonitorModal, setShowMonitorModal] = useState(false);
    const [doOnce, setDoOnce] = useState(true);
    const [hasAgent, setHasAgent] = useState(false);
    const [hasMonitor, setHasMonitor] = useState(false);

    // one time check, no rendering loop
    if (currentUser.roles && doOnce) { // has role
            for (let i = 0; i < currentUser.roles.length; i++) {
                if (currentUser.roles[i] === 'ROLE_OWNER') {
                    if (currentUser.agentId !== 0) {
                        setHasAgent(true);
                    }
                    if (currentUser.monitorId !== 0) {
                        setHasMonitor(true);
                    }
                    setIsOwner(true);
                    setDoOnce(false);

                    break;
                }
            }
        }

    // agent modal state
    const handleAgentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAgentValues: InviteFormValues = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
        };
        try {
            await MailService.emailAgent(formAgentValues);
        } catch (error) {
            console.error(error);
        }
        handleAgentClose();
    };

    const handleAgentClose = () => {
        return setShowAgentModal(false);
    }

    const handleAgentShow = () => {
        return setShowAgentModal(true);
    }

    const sendAgentInvite = () => {
        handleAgentShow();
    }

    // monitor modal state
    const handleMonitorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formMonitorValues: InviteFormValues = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
        };
        try {
            await MailService.emailMonitor(formMonitorValues);
        } catch (error) {
            console.error(error);
        }
        handleMonitorClose();
    };

    const handleMonitorClose = () => {
        return setShowMonitorModal(false);
    }

    const handleMonitorShow = () => {
        return setShowMonitorModal(true);
    }

    const sendMonitorInvite = () => {
        handleMonitorShow();
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">User Profile</h1>
                <p>User: <b>{currentUser.fullname}</b></p>
                <div className="comp-div">
                    <div>
                        <ul>
                            <li><strong>Id:</strong> {currentUser.id}</li>
                            <li><strong>Email:</strong> {currentUser.email}</li>
                        </ul>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles &&
                                currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
                        </ul>
                        <strong>RSVP:</strong>
                        <ul>
                            <li>{currentUser.mfa}</li>
                        </ul>
                    </div>
                </div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                {isOwner ? (
                    <>
                        <div>
                            <h5>Need Help?</h5>
                            <img className="img-left1" src="daughter-dad-1.jpg" width="200" height="200"/>
                            <p>
                                With your subscription you have two free resources to help you navigate your data
                                collection
                                and use of it daily. Invite an Agent to help you add, modify, and/or delete data. Invite
                                a
                                Monitor to look at your data either with you or on their own time. If the invitation
                                buttons
                                are not visible below then your invites have already registered. Please note that your
                                invites
                                will contact you and need the RSVP number at the top of this page to register. This is
                                necessary
                                security that protects you.
                            </p>
                        </div>
                        <p>&nbsp;</p>
                        {!hasAgent ? (
                            <button className="btn btn-secondary buttonMargin" onClick={sendAgentInvite}>Invite
                                Agent &raquo;</button>
                        ) : (<Agent/>)}
                        {/* AGENT INVITE MODAL CONTENT */}
                        <Modal show={showAgentModal} onHide={handleAgentClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Agent Invitation Notification</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleAgentSubmit}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" name="name"/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label><b>Agent Email</b></Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name="email"/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>&nbsp;
                                    <Button variant="secondary" onClick={handleAgentClose}>
                                        Cancel
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        {!hasMonitor ? (
                            <button className="btn btn-secondary buttonMargin" onClick={sendMonitorInvite}>Invite
                                Monitor &raquo;</button>
                        ) : (<Monitor/>)}
                        {/* MONITOR INVITE MODAL CONTENT */}
                        <Modal show={showMonitorModal} onHide={handleMonitorClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Monitor Invitation Notification</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleMonitorSubmit}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter name" name="name"/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label><b>Monitor Email</b></Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" name="email"/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>&nbsp;
                                    <Button variant="secondary" onClick={handleMonitorClose}>
                                        Cancel
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </>) : (<meta/>)}
            </header>
            <p></p>
            <p></p>
            <footer className="container">
                <p><img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="24"
                        height="24"/> &copy; VirtualYou and David L Whitehurst 2023</p>
            </footer>
        </div>
    );
};

export default Profile;
