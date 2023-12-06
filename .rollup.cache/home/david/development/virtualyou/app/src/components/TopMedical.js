import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { useEffect, useState } from "react";
import MedicalService from "../services/medical.service.ts";
import { Button, Form, Modal } from "react-bootstrap";
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AuthService from "../services/auth.service.ts";
const TopMedical = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    // crude refresh
    function refreshPage() {
        window.location.reload();
    }
    // create popup modal
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPrescriptionValues = {
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
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        MedicalService.createPrescription(formPrescriptionValues);
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
        MedicalService.getPrescriptions()
            .then((response) => {
            setPrescriptions(response.data);
        });
    }, []);
    if (!prescriptions) {
        return _jsx("div", { children: "Loading..." });
    }
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Medical" }), _jsx("p", { children: "This is where we work with our health and medical needs." }), _jsxs("h3", { className: "font-weight-light", children: ["Prescriptions", user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                            _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openCreate, children: "New" })] }), _jsxs(Modal, { show: showCreate, onHide: handleCreateClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Prescription Create" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", id: "name", name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "IdentNo" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter ident no", id: "identNo", name: "identNo" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Size" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter size", id: "size", name: "size" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Form" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter form", id: "form", name: "form" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "RxUnit" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter Rx unit", id: "rxUnit", name: "rxUnit" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Quantity" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter quantity", id: "quantity", name: "quantity" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Pharmacy" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter pharmacy", id: "pharmacy", name: "pharmacy" })] }), _jsxs(Form.Group, { controlId: "form8", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Pharmacy Phone" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter pharmacy phone", id: "pharmacyPhone", name: "pharmacyPhone" })] }), _jsxs(Form.Group, { controlId: "form9", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Written" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter when written", id: "written", name: "written" })] }), _jsxs(Form.Group, { controlId: "form10", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Written By" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter written by", id: "writtenBy", name: "writtenBy" })] }), _jsxs(Form.Group, { controlId: "form11", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Filled" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter when filled", id: "filled", name: "filled" })] }), _jsxs(Form.Group, { controlId: "form12", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Expired" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter expiry date", id: "expired", name: "expired" })] }), _jsxs(Form.Group, { controlId: "form13", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Refill Note" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter refill note", id: "refillNote", name: "refillNote" })] }), _jsxs(Form.Group, { controlId: "form14", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Manufactured By" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter manufactured by", id: "manufacturedBy", name: "manufacturedBy" })] }), _jsxs(Form.Group, { controlId: "form15", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Note" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter note", id: "note", name: "note" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleCreateClose, children: "Cancel" })] }) })] }), _jsx(PrescriptionDisplay, { data: prescriptions })] }) }));
};
export default TopMedical;
//# sourceMappingURL=TopMedical.js.map