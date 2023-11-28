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
import { Button, Modal } from 'react-bootstrap';
import Task from '../../types/task.type.ts';

const TaskDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [task, setTask] = useState<Task>();
    const [showModal, setShowModal] = useState(false);

    // modal state
    const handleOkay = () => {
        //AdministrationService.deleteTask(parseInt(param));
        handleClose();
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

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Task Details</h1>
                <p>This is where we show the entire Task Object</p>
                <a className="btn btn-primary" href="#" role="button">
                    Edit
                </a>
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
