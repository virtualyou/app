import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import MailService from "../services/mail.service.ts";
import { useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
const Home = () => {
    const [showAgentModal, setShowAgentModal] = useState(false);
    const [showMonitorModal, setShowMonitorModal] = useState(false);
    // agent modal state
    const handleAgentSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAgentValues = {
            name: formData.get('name'),
            email: formData.get('email'),
        };
        MailService.emailAgent(formAgentValues);
        handleAgentClose();
    };
    const handleAgentClose = () => {
        return setShowAgentModal(false);
    };
    const handleAgentShow = () => {
        return setShowAgentModal(true);
    };
    const sendAgentInvite = () => {
        handleAgentShow();
    };
    // monitor modal state
    const handleMonitorSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formMonitorValues = {
            name: formData.get('name'),
            email: formData.get('email'),
        };
        MailService.emailMonitor(formMonitorValues);
        handleMonitorClose();
    };
    const handleMonitorClose = () => {
        return setShowMonitorModal(false);
    };
    const handleMonitorShow = () => {
        return setShowMonitorModal(true);
    };
    const sendMonitorInvite = () => {
        handleMonitorShow();
    };
    return (_jsxs("div", { className: "jumbotron-fluid", children: [_jsxs("div", { className: "container", children: [_jsx("h1", { className: "display-3", children: "Welcome!" }), _jsx("p", { children: "We host a productive application to serve every person with an internet-connected device and a strong desire to organize their life. We aim to provide great value for your time invested in your account at VirtualYou. And, this time should provide you a return on your efforts. Remember, the view comes after the climb. As we grow our feature base we expect that you will build yourself a living dataset and a healthy VirtualYou." }), _jsx("p", { children: _jsx("a", { className: "btn btn-primary btn-lg", href: "#", role: "button", children: "Learn more \u00BB" }) })] }), _jsx("div", { className: "container", children: _jsxs("div", { className: "row", children: [_jsxs("div", { className: "col-md-4", children: [_jsx("h2", { children: "You" }), _jsx("p", { children: "VirtualYou.info will define you virtually in one easily accessible and convenient application online. And, like every other application out there, we\u2019re trying to win your loyalty and attention too. We do differ from the others because we are going to allow all registered users (Owners) to assign one Agent and one Monitor to their account." }), _jsx("p", { children: _jsx("a", { className: "btn btn-secondary", href: "#", role: "button", children: "Get Started \u00BB" }) })] }), _jsxs("div", { className: "col-md-4", children: [_jsx("h2", { children: "Monitor" }), _jsx("p", { children: "The Monitor can login and see the Owner\u2019s data, however they are not authorized to make any changes. A friend could check on a VirtualYou user or even have a discussion on the phone using the application and be thousands of miles away." }), _jsxs("p", { children: [_jsx("br", {}), _jsx("br", {}), _jsx("button", { className: "btn btn-secondary", onClick: sendMonitorInvite, children: "Invite Monitor \u00BB" }), _jsxs(Modal, { show: showMonitorModal, onHide: handleMonitorClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Monitor Invitation Notification" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleMonitorSubmit, children: [_jsxs(Form.Group, { controlId: "formBasicName", children: [_jsx(Form.Label, { children: "Name" }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", name: "name" })] }), _jsxs(Form.Group, { controlId: "formBasicEmail", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Monitor Email" }) }), _jsx(Form.Control, { type: "email", placeholder: "Enter email", name: "email" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleMonitorClose, children: "Cancel" })] }) })] })] })] }), _jsxs("div", { className: "col-md-4", children: [_jsx("h2", { children: "Agent" }), _jsx("p", { children: "The Agent will have rights to help edit the definition of their Owner\u2019s account. The Agent is essentially an assistant to the Owner, e.g. an adult child can help a parent with their monthly bills. A lawyer Agent might help a paying client with their end-of-life affairs. A family care provider can help a mentally ill parent with day to day activities or appointments." }), _jsxs("p", { children: [_jsx("button", { className: "btn btn-secondary", onClick: sendAgentInvite, children: "Invite Agent \u00BB" }), _jsxs(Modal, { show: showAgentModal, onHide: handleAgentClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Agent Invitation Notification" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleAgentSubmit, children: [_jsxs(Form.Group, { controlId: "formBasicName", children: [_jsx(Form.Label, { children: "Name" }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", name: "name" })] }), _jsxs(Form.Group, { controlId: "formBasicEmail", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Agent Email" }) }), _jsx(Form.Control, { type: "email", placeholder: "Enter email", name: "email" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleAgentClose, children: "Cancel" })] }) })] })] })] })] }) }), _jsx("p", {}), _jsx("p", {}), _jsx("footer", { className: "container", children: _jsx("p", { children: "\u00A9 VirtualYou and David L Whitehurst 2023" }) })] }));
};
export default Home;
//# sourceMappingURL=Home.js.map