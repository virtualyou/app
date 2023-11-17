/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import MailService from "../services/mail.service.ts"
import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';

interface FormValues {
    name: string;
    email: string;
}
const Home = () => {
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [showMonitorModal, setShowMonitorModal] = useState(false);

    // agent modal state
    const handleAgentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAgentValues: FormValues = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
        };
        MailService.emailAgent(formAgentValues);
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
    const handleMonitorSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formMonitorValues: FormValues = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
        };
        MailService.emailMonitor(formMonitorValues);
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
            <div className="jumbotron-fluid">
                <div className="container">
                    <h1 className="display-3">Welcome!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                        in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>You</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
                                porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><a className="btn btn-secondary" href="#" role="button">Get Started &raquo;</a></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Monitor</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
                                porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p>
                                <button className="btn btn-secondary" onClick={sendMonitorInvite}>Invite Monitor &raquo;</button>
                                <Modal show={showMonitorModal} onHide={handleMonitorClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Monitor Invitation Notification</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleMonitorSubmit}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" name="name" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label><b>Monitor Email</b></Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name="email" />
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
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h2>Agent</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
                                porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p>
                                <button className="btn btn-secondary" onClick={sendAgentInvite}>Invite Agent &raquo;</button>
                                <Modal show={showAgentModal} onHide={handleAgentClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Agent Invitation Notification</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleAgentSubmit}>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" name="name" />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label><b>Agent Email</b></Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" name="email" />
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
                            </p>
                        </div>
                    </div>
                </div>
                <p></p>
                <p></p>
                <footer className="container">
                    <p>&copy; VirtualYou and David L Whitehurst 2023</p>
                </footer>
            </div>
        );
};

export default Home;