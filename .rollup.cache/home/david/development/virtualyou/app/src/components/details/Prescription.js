import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MedicalService from "../../services/medical.service.ts";
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
const PrescriptionDetails = () => {
    const location = useLocation();
    const [param, setParam] = useState("");
    const [rx, setRx] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    // modal state
    const handleOkay = () => {
        MedicalService.deletePrescription(parseInt(param));
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
        const formPrescriptionValues = {
            id: parseInt(param),
            name: formData.get('name'),
            identNo: formData.get('identNo'),
            size: formData.get('size'),
            form: formData.get('form'),
            rxUnit: formData.get('rxUnit'),
            quantity: formData.get('quantity'),
            pharmacy: formData.get('pharmacy'),
            pharmacyPhone: formData.get('pharmacyPhone'),
            written: formData.get('written'),
            writtenBy: formData.get('writtenBy'),
            filled: formData.get('filled'),
            expired: formData.get('expired'),
            refillNote: formData.get('refillNote'),
            manufacturedBy: formData.get('manufacturedBy'),
            note: formData.get('note'),
            userKey: userkey
        };
        MedicalService.updatePrescription(parseInt(param), formPrescriptionValues);
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
        MedicalService.getPrescription(parseInt(id))
            .then((response) => {
            setRx(response.data);
        });
    }, []);
    if (!rx) {
        return _jsx("div", { children: "Loading..." });
    }
    const userkey = rx.userKey;
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Prescription Details" }), _jsx("p", { children: "This is where we show the entire Prescription Object" }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openEdit, children: "Edit" }), _jsx(Button, { className: "spacial-button", variant: "secondary", onClick: goBack, children: "Back" }), _jsxs(Modal, { show: showEdit, onHide: handleEditorClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Prescription Edit" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.name, name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "IdentNo" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.identNo, name: "identNo" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Size" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.size, name: "size" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Form" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.form, name: "form" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "RxUnit" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.rxUnit, name: "rxUnit" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Quantity" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.quantity, name: "quantity" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Pharmacy" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.pharmacy, name: "pharmacy" })] }), _jsxs(Form.Group, { controlId: "form8", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Pharmacy Phone" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.pharmacyPhone, name: "pharmacyPhone" })] }), _jsxs(Form.Group, { controlId: "form9", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Written" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.written, name: "written" })] }), _jsxs(Form.Group, { controlId: "form10", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Written By" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.writtenBy, name: "writtenBy" })] }), _jsxs(Form.Group, { controlId: "form11", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Filled" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.filled, name: "filled" })] }), _jsxs(Form.Group, { controlId: "form12", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Expired" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.expired, name: "expired" })] }), _jsxs(Form.Group, { controlId: "form13", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Refill Note" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.refillNote, name: "refillNote" })] }), _jsxs(Form.Group, { controlId: "form14", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Manufactured By" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.manufacturedBy, name: "manufacturedBy" })] }), _jsxs(Form.Group, { controlId: "form15", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Note" }) }), _jsx(Form.Control, { type: "text", defaultValue: rx.note, name: "note" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleEditorClose, children: "Cancel" })] }) })] }), _jsxs("div", { className: "detail-div", children: [_jsxs("div", { children: [_jsx("strong", { children: "id: " }), " ", param] }), _jsxs("div", { children: [_jsx("strong", { children: "identNo:" }), " ", rx.name] }), _jsxs("div", { children: [_jsx("strong", { children: "size:" }), " ", rx.size] }), _jsxs("div", { children: [_jsx("strong", { children: "form:" }), " ", rx.form] }), _jsxs("div", { children: [_jsx("strong", { children: "rxUnit:" }), " ", rx.rxUnit] }), _jsxs("div", { children: [_jsx("strong", { children: "quantity:" }), " ", rx.quantity] }), _jsxs("div", { children: [_jsx("strong", { children: "pharmacy:" }), " ", rx.pharmacy] }), _jsxs("div", { children: [_jsx("strong", { children: "pharmacyPhone:" }), " ", rx.pharmacyPhone] }), _jsxs("div", { children: [_jsx("strong", { children: "written:" }), " ", rx.written] }), _jsxs("div", { children: [_jsx("strong", { children: "writtenBy:" }), " ", rx.writtenBy] }), _jsxs("div", { children: [_jsx("strong", { children: "filled:" }), " ", rx.filled] }), _jsxs("div", { children: [_jsx("strong", { children: "expired:" }), " ", rx.expired] }), _jsxs("div", { children: [_jsx("strong", { children: "refillNote:" }), " ", rx.refillNote] }), _jsxs("div", { children: [_jsx("strong", { children: "manufacturedBy:" }), " ", rx.manufacturedBy] }), _jsxs("div", { children: [_jsx("strong", { children: "note:" }), " ", rx.note] }), _jsxs("div", { children: [_jsx("strong", { children: "userKey:" }), " ", rx.userKey] })] }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { variant: "danger", onClick: openModal, children: "Delete" }), _jsxs(Modal, { show: showModal, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Warning" }) }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "Are you sure?" }), _jsx(Button, { variant: "primary", onClick: handleOkay, children: "Okay" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Cancel" })] })] })] }) }));
};
export default PrescriptionDetails;
//# sourceMappingURL=Prescription.js.map