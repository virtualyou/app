/*
Copyright 2023 VirtualYou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

TopAdministration.tsx - All Administration page (component)
@author David L Whitehurst

*/

import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import AdministrationService from "../services/administration.service.ts";
import CreateTask from "../types/createtask.type.ts";
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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPeepValues: CreateTask = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            priority: formData.get('priority') as string,
            due: formData.get('due') as string,
            completed: formData.get('completed') as string,
            trigger: formData.get('trigger') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        AdministrationService.createTask(formPeepValues);
        handleCreateClose();
        refreshPage();
        //goBack();
    };

    const handleCreateClose = () => {
        return setShowCreate(false);
    }

    const showCreatePop = () => {
        return setShowCreate(true);
    }

    const openCreate = () => {
        return showCreatePop();
    }

    useEffect(() => {
        AdministrationService.getTasks()
            .then((response) => {
                setTasks(response.data);
            })
    }, [])

    if (!tasks) {
        return <div>Loading...</div>;
    }

    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Administration</h1>
                <p>This is where we attempt to administrate ourselves.</p>
                <h3 className="font-weight-light">Tasks
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={openCreate}>New</Button>}</h3>
                <Modal show={showCreate} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Task Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter type" id="type" name="type"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Priority</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter priority" id="priority" name="priority"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Due</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter due date" id="due" name="due"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Completed</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter complete date" id="completed" name="completed"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Trigger</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter trigger" id="trigger" name="trigger"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter note" id="note" name="note"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={handleCreateClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <TaskDisplay data={tasks} />
            </header>
        </div>
    );
};

export default TopAdministration;
