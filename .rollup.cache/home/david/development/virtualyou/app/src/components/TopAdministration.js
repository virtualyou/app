import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AdministrationService from "../services/administration.service.ts";
import TaskDisplay from "./display/TaskDisplay.tsx";
import AuthService from "../services/auth.service.ts";
const TopAdministration = () => {
    const [tasks, setTasks] = useState([]);
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
            type: formData.get('type'),
            priority: formData.get('priority'),
            due: formData.get('due'),
            completed: formData.get('completed'),
            trigger: formData.get('trigger'),
            note: formData.get('note'),
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        AdministrationService.createTask(formPeepValues);
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
        AdministrationService.getTasks()
            .then((response) => {
            setTasks(response.data);
        });
    }, []);
    if (!tasks) {
        return _jsx("div", { children: "Loading..." });
    }
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Administration" }), _jsx("p", { children: "This is where we attempt to administrate ourselves." }), _jsxs("h3", { className: "font-weight-light", children: ["Tasks", user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                            _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openCreate, children: "New" })] }), _jsxs(Modal, { show: showCreate, onHide: handleCreateClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Task Create" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter name", id: "name", name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Type" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter type", id: "type", name: "type" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Priority" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter priority", id: "priority", name: "priority" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Due" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter due date", id: "due", name: "due" })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Completed" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter complete date", id: "completed", name: "completed" })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Trigger" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter trigger", id: "trigger", name: "trigger" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Note" }) }), _jsx(Form.Control, { type: "text", placeholder: "Enter note", id: "note", name: "note" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleCreateClose, children: "Cancel" })] }) })] }), _jsx(TaskDisplay, { data: tasks })] }) }));
};
export default TopAdministration;
//# sourceMappingURL=TopAdministration.js.map