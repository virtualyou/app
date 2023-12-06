import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import FinancialService from "../services/financial.service.ts";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import { Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service.ts";
const TopFinancial = () => {
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [showAssetCreate, setShowAssetCreate] = useState(false);
    const [showDebtCreate, setShowDebtCreate] = useState(false);
    // crude refresh
    function refreshPage() {
        window.location.reload();
    }
    // create asset popup modal
    const handleAssetSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAssetValues = {
            name: formData.get('name'),
            assetType: formData.get('assetType'),
            accountNo: formData.get('accountNo'),
            website: formData.get('website'),
            websiteUser: formData.get('websiteUser'),
            websitePassword: formData.get('websitePassword'),
            holdingCompany: formData.get('holdingCompany'),
            holdingCompanyAddress: formData.get('holdingCompanyAddress'),
            holdingCompanyPhone: formData.get('holdingCompanyPhone'),
            balance: formData.get('balance'),
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        FinancialService.createAsset(formAssetValues);
        handleAssetCreateClose();
        refreshPage();
        //goBack();
    };
    const handleAssetCreateClose = () => {
        return setShowAssetCreate(false);
    };
    const showAssetCreatePop = () => {
        return setShowAssetCreate(true);
    };
    const openAssetCreate = () => {
        return showAssetCreatePop();
    };
    // create debt popup modal
    const handleDebtSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDebtValues = {
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
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        console.log(formDebtValues);
        FinancialService.createDebt(formDebtValues);
        handleDebtCreateClose();
        refreshPage();
        //goBack();
    };
    const handleDebtCreateClose = () => {
        return setShowDebtCreate(false);
    };
    const showDebtCreatePop = () => {
        return setShowDebtCreate(true);
    };
    const openDebtCreate = () => {
        return showDebtCreatePop();
    };
    useEffect(() => {
        FinancialService.getAssets()
            .then((response) => {
            setAssets(response.data);
        });
    }, []);
    useEffect(() => {
        FinancialService.getDebts()
            .then((response) => {
            setDebts(response.data);
        });
    }, []);
    if (!assets || !debts) {
        return _jsx("div", { children: "Loading..." });
    }
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Financial" }), _jsx("p", { children: "This is where we work with the financials." }), _jsxs("h3", { className: "font-weight-light", children: ["Assets", user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                            _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openAssetCreate, children: "New" })] }), _jsxs(Modal, { show: showAssetCreate, onHide: handleAssetCreateClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Asset Create" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleAssetSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", id: "name", name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Asset Type" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter asset type", id: "assetType", name: "assetType" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Account Number" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter account number", id: "accountNo", name: "accountNo" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Website" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter website", id: "website", name: "website" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site User" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter website user", id: "websiteUser", name: "websiteUser" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site Password" }) }), _jsx(Form.Control, { type: "password", placeholder: "Enter website password", id: "websitePassword", name: "websitePassword" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter holding company", id: "holdingCompany", name: "holdingCompany" })] }), _jsxs(Form.Group, { controlId: "form8", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Address" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter holding company address", id: "holdingCompanyAddress", name: "holdingCompanyAddress" })] }), _jsxs(Form.Group, { controlId: "form9", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Phone" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter holding company phone", id: "holdingCompanyPhone", name: "holdingCompanyPhone" })] }), _jsxs(Form.Group, { controlId: "form10", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Balance" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter balance", id: "balance", name: "balance" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleAssetCreateClose, children: "Cancel" })] }) })] }), _jsx(AssetDisplay, { data: assets }), _jsxs("h3", { className: "font-weight-light", children: ["Debts", user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                            _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openDebtCreate, children: "New" })] }), _jsxs(Modal, { show: showDebtCreate, onHide: handleDebtCreateClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Debt Create" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleDebtSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", id: "name", name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Debt Type" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter debt type", id: "debtType", name: "debtType" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Account Number" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter account number", id: "accountNo", name: "accountNo" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Website" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter website", id: "website", name: "website" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site User" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter website user", id: "websiteUser", name: "websiteUser" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site Password" }) }), _jsx(Form.Control, { type: "password", placeholder: "Enter website password", id: "websitePassword", name: "websitePassword" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter holding company", id: "holdingCompany", name: "holdingCompany" })] }), _jsxs(Form.Group, { controlId: "form8", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Address" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter holding company address", id: "holdingCompanyAddress", name: "holdingCompanyAddress" })] }), _jsxs(Form.Group, { controlId: "form9", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Phone" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter holding company phone", id: "holdingCompanyPhone", name: "holdingCompanyPhone" })] }), _jsxs(Form.Group, { controlId: "form10", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Balance" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter balance", id: "balance", name: "balance" })] }), _jsxs(Form.Group, { controlId: "form11", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Frequency" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter frequency", id: "frequency", name: "frequency" })] }), _jsxs(Form.Group, { controlId: "form12", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Due" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter payment due date", id: "due", name: "due" })] }), _jsxs(Form.Group, { controlId: "form13", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Payment" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter payment", id: "payment", name: "payment" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleDebtCreateClose, children: "Cancel" })] }) })] }), _jsx(DebtDisplay, { data: debts })] }) }));
};
export default TopFinancial;
//# sourceMappingURL=TopFinancial.js.map