/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdministrationService from "../../services/administration.service.ts";
import {Button, Form, Modal} from 'react-bootstrap';
import Task from '../../types/task.type.ts';
import { useNavigate } from "react-router-dom";

const TaskDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [task, setTask] = useState<Task>();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = () => {
        AdministrationService.deleteTask(parseInt(param));
        handleClose();
        goBack();
    };

    const handleClose = () => {
        return setShowModal(false);
    }

    const showPop = () => {
        return setShowModal(true);
    }

    const openModal = () => {
        return showPop();
    }

    // editor popup modal
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formTaskValues: Task = {
            id: parseInt(param),
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            priority: formData.get('priority') as string,
            due: formData.get('due') as string,
            completed: formData.get('completed') as string,
            trigger: formData.get('trigger') as string,
            note: formData.get('note') as string,
            userKey: userkey
        };
        AdministrationService.updateTask(parseInt(param), formTaskValues);
        handleEditorClose();
        goBack();
    };

    const handleEditorClose = () => {
        return setShowEdit(false);
    }

    const showEditPop = () => {
        return setShowEdit(true);
    }

    const openEdit = () => {
        return showEditPop();
    }

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        if (!id) return;
        setParam(id);

        AdministrationService.getTask(parseInt(id))
            .then((response) => {
                setTask(response.data);
            })

    }, []);

    if (!task) {
        return <div>Loading...</div>;
    }

    const userkey = task.userKey;

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Task Details</h1>
                <p>This is where we show the entire Task Object</p>
                <Button className="spacial-button" variant="primary" onClick={openEdit}>Edit</Button>
                <Button className="spacial-button" variant="secondary" onClick={goBack}>Back</Button>
                <Modal show={showEdit} onHide={handleEditorClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Task Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.name} name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Type</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.type} name="type"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Priority</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.priority} name="priority"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Due</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.due} name="due"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Completed</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.completed} name="completed"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Trigger</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.trigger} name="trigger"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" defaultValue={task.note} name="note"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={handleEditorClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <div className="detail-div">
                    <div><strong>id: </strong> {param}</div>
                    <div><strong>name:</strong> {task.name}</div>
                    <div><strong>type:</strong> {task.type}</div>
                    <div><strong>priority:</strong> {task.priority}</div>
                    <div><strong>due:</strong> {task.due}</div>
                    <div><strong>completed:</strong> {task.completed}</div>
                    <div><strong>trigger:</strong> {task.trigger}</div>
                    <div><strong>note:</strong> {task.note}</div>
                    <div><strong>userKey:</strong> {task.userKey}</div>
                </div>
                <Button variant="danger" onClick={openModal}>Delete</Button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure?</p>
                        <Button variant="primary" onClick={handleOkay}>
                            Okay
                        </Button>&nbsp;
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Body>
                </Modal>
            </header>
        </div>
    );
};

export default TaskDetails;
