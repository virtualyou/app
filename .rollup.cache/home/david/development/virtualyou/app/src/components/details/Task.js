import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdministrationService from "../../services/administration.service.ts";
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const TaskDetails = () => {
    const location = useLocation();
    const [param, setParam] = useState("");
    const [task, setTask] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [dueDate, setDueDate] = useState(new Date());
    const [completeDate, setCompleteDate] = useState(new Date());
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    // modal state
    const handleOkay = () => {
        AdministrationService.deleteTask(parseInt(param));
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
        const formTaskValues = {
            id: parseInt(param),
            name: formData.get('name'),
            type: formData.get('type'),
            priority: formData.get('priority'),
            due: formData.get('due'),
            completed: formData.get('completed'),
            trigger: formData.get('trigger'),
            note: formData.get('note'),
            userKey: userkey
        };
        AdministrationService.updateTask(parseInt(param), formTaskValues);
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
        AdministrationService.getTask(parseInt(id))
            .then((response) => {
            setTask(response.data);
        });
    }, []);
    // this is sweet !!!!
    useEffect(() => {
        if (!task)
            return;
        if (!task.due) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setDueDate("");
        }
        else {
            setDueDate(new Date(task.due));
        }
        if (!task.completed) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setCompleteDate("");
        }
        else {
            setCompleteDate(new Date(task.completed));
        }
    }, [task]);
    if (!task) {
        return _jsx("div", { children: "Loading..." });
    }
    const userkey = task.userKey;
    const user = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Task Details" }), _jsx("p", { children: "This is where we show the entire Task Object" }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { className: "spacial-button", variant: "primary", onClick: openEdit, children: "Edit" }), _jsx(Button, { className: "spacial-button", variant: "secondary", onClick: goBack, children: "Back" }), _jsxs(Modal, { show: showEdit, onHide: handleEditorClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Task Edit" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { controlId: "form1", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Name" }) }), _jsx(Form.Control, { type: "text", defaultValue: task.name, name: "name" })] }), _jsxs(Form.Group, { controlId: "form2", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Type" }) }), _jsx(Form.Control, { type: "text", defaultValue: task.type, name: "type" })] }), _jsxs(Form.Group, { controlId: "form3", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Priority" }) }), _jsx(Form.Control, { type: "text", defaultValue: task.priority, name: "priority" })] }), _jsxs(Form.Group, { controlId: "form4", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Due" }) }), _jsx(DatePicker, { selected: dueDate, onChange: (date) => setDueDate(date), name: "due", wrapperClassName: "my-datepicker", customInput: _jsx(Form.Control, { type: "text" }) })] }), _jsxs(Form.Group, { controlId: "form5", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Completed" }) }), _jsx(DatePicker, { selected: completeDate, onChange: (date) => setCompleteDate(date), name: "completed", wrapperClassName: "my-datepicker", customInput: _jsx(Form.Control, { type: "text" }) })] }), _jsxs(Form.Group, { controlId: "form6", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Trigger" }) }), _jsx(Form.Control, { type: "text", defaultValue: task.trigger, name: "trigger" })] }), _jsxs(Form.Group, { controlId: "form7", children: [_jsx(Form.Label, { children: _jsx("b", { children: "Note" }) }), _jsx(Form.Control, { type: "text", defaultValue: task.note, name: "note" })] }), _jsx(Button, { variant: "primary", type: "submit", children: "Submit" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleEditorClose, children: "Cancel" })] }) })] }), _jsxs("div", { className: "detail-div", children: [_jsxs("div", { children: [_jsx("strong", { children: "id: " }), " ", param] }), _jsxs("div", { children: [_jsx("strong", { children: "name:" }), " ", task.name] }), _jsxs("div", { children: [_jsx("strong", { children: "type:" }), " ", task.type] }), _jsxs("div", { children: [_jsx("strong", { children: "priority:" }), " ", task.priority] }), _jsxs("div", { children: [_jsx("strong", { children: "due:" }), " ", task.due] }), _jsxs("div", { children: [_jsx("strong", { children: "completed:" }), " ", task.completed] }), _jsxs("div", { children: [_jsx("strong", { children: "trigger:" }), " ", task.trigger] }), _jsxs("div", { children: [_jsx("strong", { children: "note:" }), " ", task.note] }), _jsxs("div", { children: [_jsx("strong", { children: "userKey:" }), " ", task.userKey] })] }), user.roles.includes(("ROLE_MONITOR")) ? _jsx("meta", {}) :
                    _jsx(Button, { variant: "danger", onClick: openModal, children: "Delete" }), _jsxs(Modal, { show: showModal, onHide: handleClose, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: "Warning" }) }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "Are you sure?" }), _jsx(Button, { variant: "primary", onClick: handleOkay, children: "Okay" }), "\u00A0", _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Cancel" })] })] })] }) }));
};
export default TaskDetails;
//# sourceMappingURL=Task.js.map