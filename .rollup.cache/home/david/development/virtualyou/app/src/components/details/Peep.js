import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PersonalService from "../../services/personal.service.ts";
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
const PeepDetails = () => {
    const location = useLocation();
    const [param, setParam] = useState("");
    const [peep, setPeep] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    // modal state
    const handleOkay = () => {
        PersonalService.deletePeep(parseInt(param));
        handleClose();
        goBack();
    };
    const handleClose = () => {
        return setShowModal(false);
    };
    const showPop = () => {
        return setShowModal(true);
    };
    const openModal = () => {
        return showPop();
    };
    // editor popup modal
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPeepValues = {
            id: parseInt(param),
            name: formData.get('name'),
            phone1: formData.get('phone1'),
            phone2: formData.get('phone2'),
            email: formData.get('email'),
            address: formData.get('address'),
            note: formData.get('note'),
            userKey: userkey
        };
        PersonalService.updatePeep(parseInt(param), formPeepValues);
        handleEditorClose();
        goBack();
    };
    const handleEditorClose = () => {
        return setShowEdit(false);
    };
    const showEditPop = () => {
        return setShowEdit(true);
    };
    const openEdit = () => {
        return showEditPop();
    };
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        if (!id)
            return;
        setParam(id);
        PersonalService.getPeep(parseInt(id))
            .then((response) => {
            setPeep(response.data);
        });
    }, []);
    if (!peep) {
        return _jsx("div", { children: "Loading..." });
    }
    const userkey = peep.userKey;
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Contact Details" }), _jsx("p", { children: "This is where we show the entire Contact Object" }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openEdit, children: "Edit" }), _jsx(Button, { className: "spacial-button", variant: "secondary", onClick: goBack, children: "Back" }), _jsxs(Modal, { show: showEdit, onHide: handleEditorClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Contact Edit" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", defaultValue: peep.name, name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Phone 1" }) }), _jsx(Form.Control, { type: "text", defaultValue: peep.phone1, name: "phone1" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Phone 2" }) }), _jsx(Form.Control, { type: "text", defaultValue: peep.phone2, name: "phone2" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Email" }) }), _jsx(Form.Control, { type: "text", defaultValue: peep.email, name: "email" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Address" }) }), _jsx(Form.Control, { type: "text", defaultValue: peep.address, name: "address" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Note" }) }), _jsx(Form.Control, { type: "text", defaultValue: peep.note, name: "note" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleEditorClose, children: "Cancel" })] }) })] }), _jsxs("div", { className: "detail-div", children: [_jsxs("div", { children: [_jsx("strong", { children: "id: " }), " ", param] }), _jsxs("div", { children: [_jsx("strong", { children: "name:" }), " ", peep.name] }), _jsxs("div", { children: [_jsx("strong", { children: "phone1:" }), " ", peep.phone1] }), _jsxs("div", { children: [_jsx("strong", { children: "phone2:" }), " ", peep.phone2] }), _jsxs("div", { children: [_jsx("strong", { children: "email:" }), " ", peep.email] }), _jsxs("div", { children: [_jsx("strong", { children: "address:" }), " ", peep.address] }), _jsxs("div", { children: [_jsx("strong", { children: "note:" }), " ", peep.note] }), _jsxs("div", { children: [_jsx("strong", { children: "userKey:" }), " ", peep.userKey] })] }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { variant: "danger", onClick: openModal, children: "Delete" }), _jsxs(Modal, { show: showModal, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Warning" }) }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "Are you sure?" }), _jsx(Button, { variant: "primary", onClick: handleOkay, children: "Okay" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Cancel" })] })] })] }) }));
};
export default PeepDetails;
//# sourceMappingURL=Peep.js.map