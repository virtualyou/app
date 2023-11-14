import MailService from "../services/mail.service.ts"
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';

const Home = () => {
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [showMonitorModal, setShowMonitorModal] = useState(false);

    const handleAgentClose = () => {
        return setShowAgentModal(false);
    }
    const handleAgentShow = () => {
        return setShowAgentModal(true);
    }

    const handleMonitorClose = () => {
        return setShowMonitorModal(false);
    }
    const handleMonitorShow = () => {
        return setShowMonitorModal(true);
    }

    const sendAgentInvite = () => {
        MailService.emailAgent();
        handleAgentShow();
    }

    const sendMonitorInvite = () => {
        MailService.emailMonitor();
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
                                    <Modal.Body>An email invitation has been sent!</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleMonitorClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
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
                                    <Modal.Body>An email invitation has been sent!</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleAgentClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </p>
                        </div>
                    </div>
                </div>
                <footer className="container">
                    <p>&copy; VirtualYou and David L Whitehurst 2023</p>
                </footer>
            </div>
        );
};

export default Home;