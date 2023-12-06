import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FinancialService from "../../services/financial.service.ts";
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DebtDetails = () => {
    const location = useLocation();
    const [param, setParam] = useState("");
    const [debt, setDebt] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    // modal state
    const handleOkay = () => {
        FinancialService.deleteDebt(parseInt(param));
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
        const formDebtValues = {
            id: parseInt(param),
            name: formData.get('name'),
            debtType: formData.get('debtType'),
            accountNo: formData.get('accountNo'),
            website: formData.get('website'),
            websiteUser: formData.get('websiteUser'),
            websitePassword: formData.get('websitePassword'),
            holdingCompany: formData.get('holdingCompany'),
            holdingCompanyAddress: formData.get('holdingCompanyAddress'),
            holdingCompanyPhone: formData.get('holdingCompanyPhone'),
            balance: formData.get('balance'),
            frequency: formData.get('frequency'),
            due: formData.get('due'),
            payment: formData.get('payment'),
            userKey: userkey
        };
        FinancialService.updateDebt(parseInt(param), formDebtValues);
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
        FinancialService.getDebt(parseInt(id))
            .then((response) => {
            setDebt(response.data);
        });
    }, []);
    // this is sweet !!!!
    useEffect(() => {
        if (!debt)
            return;
        setDueDate(new Date(debt.due));
    }, [debt]);
    if (!debt) {
        return _jsx("div", { children: "Loading..." });
    }
    const userkey = debt.userKey;
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Debt Details" }), _jsx("p", { children: "This is where we show the entire Debt Object" }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openEdit, children: "Edit" }), _jsx(Button, { className: "spacial-button", variant: "secondary", onClick: goBack, children: "Back" }), _jsxs(Modal, { show: showEdit, onHide: handleEditorClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Asset Edit" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.name, name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Debt Type" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.debtType, name: "debtType" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Account Number" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.accountNo, name: "accountNo" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Website" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.website, name: "website" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site User" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.websiteUser, name: "websiteUser" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site Password" }) }), _jsx(Form.Control, { type: "password", defaultValue: debt.websitePassword, name: "websitePassword" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.holdingCompany, name: "holdingCompany" })] }), _jsxs(Form.Group, { controlId: "form8", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Address" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.holdingCompanyAddress, name: "holdingCompanyAddress" })] }), _jsxs(Form.Group, { controlId: "form9", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Phone" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.holdingCompanyPhone, name: "holdingCompanyPhone" })] }), _jsxs(Form.Group, { controlId: "form10", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Balance" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.balance, name: "balance" })] }), _jsxs(Form.Group, { controlId: "form11", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Frequency" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.frequency, name: "frequency" })] }), _jsxs(Form.Group, { controlId: "form12", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Due" }) }), _jsx(DatePicker, { selected: dueDate, onChange: (date) => setDueDate(date), name: "due", wrapperClassName: "my-datepicker", customInput: _jsx(Form.Control, { type: "text" }) })] }), _jsxs(Form.Group, { controlId: "form13", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Payment" }) }), _jsx(Form.Control, { type: "text", defaultValue: debt.payment, name: "payment" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleEditorClose, children: "Cancel" })] }) })] }), _jsxs("div", { className: "detail-div", children: [_jsxs("div", { children: [_jsx("strong", { children: "id: " }), " ", param] }), _jsxs("div", { children: [_jsx("strong", { children: "name:" }), " ", debt.name] }), _jsxs("div", { children: [_jsx("strong", { children: "debtType:" }), " ", debt.debtType] }), _jsxs("div", { children: [_jsx("strong", { children: "accountNo:" }), " ", debt.accountNo] }), _jsxs("div", { children: [_jsx("strong", { children: "website:" }), " ", debt.website] }), _jsxs("div", { children: [_jsx("strong", { children: "websiteUser:" }), " ", debt.websiteUser] }), _jsxs("div", { children: [_jsx("strong", { children: "websitePassword:" }), " ", debt.websitePassword] }), _jsxs("div", { children: [_jsx("strong", { children: "holdingCompany:" }), " ", debt.holdingCompany] }), _jsxs("div", { children: [_jsx("strong", { children: "holdingCompanyAddress:" }), " ", debt.holdingCompanyAddress] }), _jsxs("div", { children: [_jsx("strong", { children: "holdingCompanyPhone:" }), " ", debt.holdingCompanyPhone] }), _jsxs("div", { children: [_jsx("strong", { children: "balance:" }), " ", debt.balance] }), _jsxs("div", { children: [_jsx("strong", { children: "frequency:" }), " ", debt.frequency] }), _jsxs("div", { children: [_jsx("strong", { children: "due:" }), " ", debt.due] }), _jsxs("div", { children: [_jsx("strong", { children: "payment:" }), " ", debt.payment] }), _jsxs("div", { children: [_jsx("strong", { children: "userKey:" }), " ", debt.userKey] })] }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { variant: "danger", onClick: openModal, children: "Delete" }), _jsxs(Modal, { show: showModal, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Warning" }) }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "Are you sure?" }), _jsx(Button, { variant: "primary", onClick: handleOkay, children: "Okay" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Cancel" })] })] })] }) }));
};
export default DebtDetails;
//# sourceMappingURL=Debt.js.map