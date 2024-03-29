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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom.css";
import CreateNeed from "../types/createneed.type.ts";
import NeedDisplay from "./display/NeedDisplay.tsx";


const TopAdministration = () => {
    const [tasks, setTasks] = useState([]);
    const [needs, setNeeds] = useState([]);

    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showNeedModal, setShowNeedModal] = useState(false);
    const [refreshTasks, setRefreshTasks] = useState(0);
    const [refreshNeeds, setRefreshNeeds] = useState(0);

    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [completeDate, setCompleteDate] = useState<Date | null>(null);

    const [tmpTaskName, setTmpTaskName] = useState('');
    const [tmpTaskType, setTmpTaskType] = useState('');
    const [tmpTaskPriority, setTmpTaskPriority] = useState('');
    const [tmpTaskTrigger, setTmpTaskTrigger] = useState('');
    const [tmpTaskNote, setTmpTaskNote] = useState('');

    const [tmpNeedName, setTmpNeedName] = useState('');
    const [tmpNeedQuantity, setTmpNeedQuantity] = useState(0);
    const [tmpNeedUnit, setTmpNeedUnit] = useState('');
    const [tmpNeedUrgency, setTmpNeedUrgency] = useState('');
    const [tmpNeedNote, setTmpNeedNote] = useState('');

    // create task popup modal
    const handleTaskSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let completed;
        let due;

        if (formData.get('taskCompleted') === "") {
            completed = null;
        } else {
            completed = formData.get('taskCompleted') as string;
        }

        if (formData.get('taskDue') === "") {
            due = null;
        } else {
            due = formData.get('taskDue') as string;
        }

        const formTaskValues: CreateTask = {
            name: formData.get('taskName') as string,
            type: formData.get('taskType') as string,
            priority: formData.get('taskPriority') as string,
            due: due,
            completed: completed,
            trigger: formData.get('taskTrigger') as string,
            note: formData.get('taskNote') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };

        try {
            await AdministrationService.createTask(formTaskValues);
        } catch (error) {
            console.error(error);
        }

        await handleTaskReset();
        closeTaskModal();
        setRefreshTasks(oldVal => oldVal +1);
    };

    // create need popup modal
    const handleNeedSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formNeedValues: CreateNeed = {
            name: formData.get('needName') as string,
            quantity: parseInt(formData.get('needQuantity') as string),
            unit: formData.get('needUnit') as string,
            urgency: formData.get('needUrgency') as string,
            note: formData.get('needNote') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };

        try {
            await AdministrationService.createNeed(formNeedValues);
        } catch (error) {
            console.error(error);
        }

        await handleNeedReset();
        closeNeedModal();
        setRefreshNeeds(oldVal => oldVal +1);
    };

    const goTaskModal = () => {
        return setShowTaskModal(true);
    }

    const handleTaskReset = async() => {
        flushTaskTmpState();
    };

    const flushTaskTmpState = () => {
        setTmpTaskName('');
        setTmpTaskType('');
        setTmpTaskPriority('');
        setTmpTaskTrigger('');
        setTmpTaskNote('');
    }

// needs
    const goNewModal = () => {
        return setShowNeedModal(true);
    }
    const handleNeedReset = async() => {
        flushNeedTmpState();
    };
    const flushNeedTmpState = () => {
        setTmpNeedName('');
        setTmpNeedQuantity(0);
        setTmpNeedUnit('');
        setTmpNeedUrgency('');
        setTmpNeedNote('');
    }
    const closeTaskModal = () => {
        return setShowTaskModal(false);
    }
    const closeNeedModal = () => {
        return setShowNeedModal(false);
    }

    useEffect(() => {
        AdministrationService.getTasks()
            .then((response) => {
                setTasks(response.data);
            })
    }, [refreshTasks])

    useEffect(() => {
        AdministrationService.getNeeds()
            .then((response) => {
                setNeeds(response.data);
            })
    }, [refreshNeeds])

    if (!tasks || !needs ) {
        return <div>Loading...</div>;
    }

    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Administration</h1>
                <p>This is where we attempt to administrate ourselves.</p>
                {/* {user.roles.includes(("ROLE_MONITOR")) ? <meta/> : */}
                <h3 className="font-weight-light">Tasks
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={goTaskModal}>New</Button>}</h3>
                <Modal show={showTaskModal} onHide={closeTaskModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleTaskSubmit}>
                            <Form.Group>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpTaskName}
                                              id="taskName"
                                              name="taskName"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter type" defaultValue={tmpTaskType}
                                              id="taskType"
                                              name="taskType"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Priority</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter priority" defaultValue={tmpTaskPriority}
                                              id="taskPriority" name="taskPriority"/>
                            </Form.Group>
                            <Form.Group controlId="due">
                                <Form.Label><b>Due</b></Form.Label>
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    name="taskDue"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text"/>}
                                />
                            </Form.Group>
                            <Form.Group controlId="completed">
                                <Form.Label><b>Completed</b></Form.Label>
                                <DatePicker
                                    selected={completeDate}
                                    onChange={(date) => setCompleteDate(date)}
                                    name="taskCompleted"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text"/>}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Trigger</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter trigger" defaultValue={tmpTaskTrigger}
                                              id="taskTrigger" name="taskTrigger"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter note" defaultValue={tmpTaskNote} id="note"
                                              name="taskNote"/>
                            </Form.Group>
                            <Button className="buttonMargin" variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={handleTaskReset}>
                                Reset
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={closeTaskModal}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <TaskDisplay data={tasks}/>
                {/* {user.roles.includes(("ROLE_MONITOR")) ? <meta/> : */}
                <h3 className="font-weight-light">Needs
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={goNewModal}>New</Button>}</h3>

                <Modal show={showNeedModal} onHide={closeNeedModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Need</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleNeedSubmit}>
                            <Form.Group>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpNeedName}
                                              id="needName"
                                              name="needName"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Quantity</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter quantity" defaultValue={tmpNeedQuantity}
                                              id="needQuantity"
                                              name="needQuantity"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Unit</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter unit" defaultValue={tmpNeedUnit}
                                              id="needUnit" name="needUnit"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Urgency</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter urgency" defaultValue={tmpNeedUrgency}
                                              id="needUrgency" name="needUrgency"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter note" defaultValue={tmpNeedNote}
                                              id="needNote"
                                              name="needNote"/>
                            </Form.Group>
                            <Button className="buttonMargin" variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={handleNeedReset}>
                                Reset
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={closeNeedModal}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <NeedDisplay data={needs}/>

            </header>
        </div>
    );
};

export default TopAdministration;
