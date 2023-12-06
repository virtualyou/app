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
const AssetDetails = () => {
    const location = useLocation();
    const [param, setParam] = useState("");
    const [asset, setAsset] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    // modal state
    const handleOkay = () => {
        FinancialService.deleteAsset(parseInt(param));
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
        const formAssetValues = {
            id: parseInt(param),
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
            userKey: userkey
        };
        FinancialService.updateAsset(parseInt(param), formAssetValues);
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
        FinancialService.getAsset(parseInt(id))
            .then((response) => {
            setAsset(response.data);
        });
    }, []);
    if (!asset) {
        return _jsx("div", { children: "Loading..." });
    }
    const userkey = asset.userKey;
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Asset Details" }), _jsx("p", { children: "This is where we show the entire Asset Object" }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openEdit, children: "Edit" }), _jsx(Button, { className: "spacial-button", variant: "secondary", onClick: goBack, children: "Back" }), _jsxs(Modal, { show: showEdit, onHide: handleEditorClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Asset Edit" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.name, name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Asset Type" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.assetType, name: "assetType" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Account Number" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.accountNo, name: "accountNo" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Website" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.website, name: "website" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site User" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.websiteUser, name: "websiteUser" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Web Site Password" }) }), _jsx(Form.Control, { type: "password", defaultValue: asset.websitePassword, name: "websitePassword" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.holdingCompany, name: "holdingCompany" })] }), _jsxs(Form.Group, { controlId: "form8", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Address" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.holdingCompanyAddress, name: "holdingCompanyAddress" })] }), _jsxs(Form.Group, { controlId: "form9", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Holding Company Phone" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.holdingCompanyPhone, name: "holdingCompanyPhone" })] }), _jsxs(Form.Group, { controlId: "form10", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Balance" }) }), _jsx(Form.Control, { type: "text", defaultValue: asset.balance, name: "balance" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleEditorClose, children: "Cancel" })] }) })] }), _jsxs("div", { className: "detail-div", children: [_jsxs("div", { children: [_jsx("strong", { children: "id: " }), " ", param] }), _jsxs("div", { children: [_jsx("strong", { children: "name:" }), " ", asset.name] }), _jsxs("div", { children: [_jsx("strong", { children: "assetType:" }), " ", asset.assetType] }), _jsxs("div", { children: [_jsx("strong", { children: "accountNo:" }), " ", asset.accountNo] }), _jsxs("div", { children: [_jsx("strong", { children: "website:" }), " ", asset.website] }), _jsxs("div", { children: [_jsx("strong", { children: "websiteUser:" }), " ", asset.websiteUser] }), _jsxs("div", { children: [_jsx("strong", { children: "websitePassword:" }), " ", asset.websitePassword] }), _jsxs("div", { children: [_jsx("strong", { children: "holdingCompany:" }), " ", asset.holdingCompany] }), _jsxs("div", { children: [_jsx("strong", { children: "holdingCompanyAddress:" }), " ", asset.holdingCompanyAddress] }), _jsxs("div", { children: [_jsx("strong", { children: "holdingCompanyPhone:" }), " ", asset.holdingCompanyPhone] }), _jsxs("div", { children: [_jsx("strong", { children: "balance:" }), " ", asset.balance] }), _jsxs("div", { children: [_jsx("strong", { children: "userKey:" }), " ", asset.userKey] })] }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { variant: "danger", onClick: openModal, children: "Delete" }), _jsxs(Modal, { show: showModal, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Warning" }) }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "Are you sure?" }), _jsx(Button, { variant: "primary", onClick: handleOkay, children: "Okay" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Cancel" })] })] })] }) }));
};
export default AssetDetails;
//# sourceMappingURL=Asset.js.map