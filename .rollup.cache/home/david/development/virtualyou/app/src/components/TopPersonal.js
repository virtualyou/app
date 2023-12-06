import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { useEffect, useState } from "react";
import PersonalService from "../services/personal.service.ts";
import { Button, Form, Modal } from "react-bootstrap";
import PeepDisplay from "./display/PeepDisplay.tsx";
import AuthService from "../services/auth.service.ts";
const TopPersonal = () => {
    const [peeps, setPeeps] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    // crude refresh
    function refreshPage() {
        window.location.reload();
    }
    // create popup modal
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPeepValues = {
            name: formData.get('name'),
            phone1: formData.get('phone1'),
            phone2: formData.get('phone2'),
            email: formData.get('email'),
            address: formData.get('address'),
            note: formData.get('note'),
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        PersonalService.createPeep(formPeepValues);
        handleCreateClose();
        refreshPage();
        //goBack();
    };
    const handleCreateClose = () => {
        return setShowCreate(false);
    };
    const showCreatePop = () => {
        return setShowCreate(true);
    };
    const openCreate = () => {
        return showCreatePop();
    };
    useEffect(() => {
        PersonalService.getPeeps()
            .then((response) => {
            setPeeps(response.data);
        });
    }, []);
    if (!peeps) {
        return _jsx("div", { children: "Loading..." });
    }
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Personal" }), _jsx("p", { children: "This is where we keep things closest to us." }), _jsxs("h3", { className: "font-weight-light", children: ["Contacts", user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                            _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openCreate, children: "New" })] }), _jsxs(Modal, { show: showCreate, onHide: handleCreateClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Contact Create" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", id: "name", name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Phone1" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter phone1", id: "phone1", name: "phone1" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Phone2" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter phone2", id: "phone2", name: "phone2" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Email" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter email", id: "email", name: "email" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Address" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter address", id: "address", name: "address" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Note" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter note", id: "note", name: "note" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleCreateClose, children: "Cancel" })] }) })] }), _jsx(PeepDisplay, { data: peeps })] }) }));
};
export default TopPersonal;
//# sourceMappingURL=TopPersonal.js.map