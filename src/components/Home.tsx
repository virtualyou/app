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
                    <p>
                        We host a productive application to serve every person with an internet-connected
                        device and a strong desire to organize their life. We aim to provide great value
                        for your time invested in your account at VirtualYou. And, this time should provide
                        you a return on your efforts. Remember, the view comes after the climb. As we
                        grow our feature base we expect that you will build yourself a living dataset
                        and a healthy VirtualYou.
                    </p>
                    <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>You</h2>
                            <p>VirtualYou.info will define you virtually in one easily accessible and convenient
                                application online. And, like every other application out there, we&rsquo;re
                                trying to win your loyalty and attention too. We do differ from the others
                                because we are going to allow all registered users (Owners) to assign one Agent
                                and one Monitor to their account.</p>
                            <p><a className="btn btn-secondary" href="#" role="button">Get Started &raquo;</a></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Monitor</h2>
                            <p>The Monitor can login and see the Owner&rsquo;s data, however they are not
                                authorized to make any changes. A friend could check on a VirtualYou user or
                                even have a discussion on the phone using the application and be thousands of
                                miles away.</p>
                            <p>
                                <br/>
                                <br/>
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
                            <p>The Agent will have rights to help edit the definition of their Owner&rsquo;s
                                account. The Agent is essentially an assistant to the Owner, e.g. an adult child
                                can help a parent with their monthly bills. A lawyer Agent might help a paying
                                client with their end-of-life affairs. A family care provider can help a
                                mentally ill parent with day to day activities or appointments.</p>
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