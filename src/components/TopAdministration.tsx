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

import React, {useEffect, useRef, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import AdministrationService from "../services/administration.service.ts";
import CreateTask from "../types/createtask.type.ts";
import TaskDisplay from "./display/TaskDisplay.tsx";
import AuthService from "../services/auth.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./custom.css";

const TASK_TALK = import.meta.env.VITE_APP_BASEPATH + "/speech/v1/assist/create/task"
const TopAdministration = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshAdmin, setRefreshAdmin] = useState(0);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [completeDate, setCompleteDate] = useState<Date | null>(null);
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    const [tmpName, setTmpName] = useState('');
    const [tmpType, setTmpType] = useState('');
    const [tmpPriority, setTmpPriority] = useState('');
    const [tmpTrigger, setTmpTrigger] = useState('');
    const [tmpNote, setTmpNote] = useState('');

    // create popup modal
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let completed;
        let due;

        if (formData.get('completed') === "") {
            completed = null;
        } else {
            completed = formData.get('completed') as string;
        }

        if (formData.get('due') === "") {
            due = null;
        } else {
            due = formData.get('due') as string;
        }

        const formPeepValues: CreateTask = {
            name: formData.get('name') as string,
            type: formData.get('type') as string,
            priority: formData.get('priority') as string,
            due: due,
            completed: completed,
            trigger: formData.get('trigger') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };

        try {
            await AdministrationService.createTask(formPeepValues);
        } catch (error) {
            console.error(error);
        }

        await handleReset();
        closeModal();
        setRefreshAdmin(oldVal => oldVal +1);
    };

// declare speech recognition
    const commands = [
        {
            command: 'The name is *',
            callback: (name: string) => setTmpName(name)
        },
        {
            command: 'The type is *',
            callback: (type: string) => setTmpType(type)
        },
        {
            command: 'The priority is *',
            callback: (priority: string) => setTmpPriority(priority)
        },
        {
            command: 'The trigger is *',
            callback: (trigger: string) => setTmpTrigger(trigger)
        },
        {
            command: 'The note is *',
            callback: (note: string) => setTmpNote(note)
        },
    ]
    // removing transcript
    const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({commands});

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="mircophone-container">
                Browser does not Support Speech Recognition.
            </div>
        );
    }

    const playQuip = async () => {
        const audio = new Audio(TASK_TALK);
        await audio.play(); // must be asynchronous
        audio.onended = function() {
            setShowModal(true);
        };
    }

    const startListener = async () => {
        flushTmpState();
        resetTranscript();
        setIsListening(true);
        // @ts-ignore
        microphoneRef.current.classList.add("listening");
        try {
            await SpeechRecognition.startListening({
                continuous: true,
            });
        } catch (error) {
            console.error(error);
        }
    };
    const stopListener = async () => {
        setIsListening(false);
        // @ts-ignore
        microphoneRef.current.classList.remove("listening");
        try {
            await SpeechRecognition.stopListening();
        } catch (error) {
            console.error(error);
        }
    };
    const handleReset = async() => {
        await stopListener();
        resetTranscript();
        flushTmpState();
    };

    const flushTmpState = () => {
        setTmpName('');
        setTmpType('');
        setTmpPriority('');
        setTmpTrigger('');
        setTmpNote('');
    }
    const closeModal = () => {
        return setShowModal(false);
    }

    useEffect(() => {
        AdministrationService.getTasks()
            .then((response) => {
                setTasks(response.data);
            })
    }, [refreshAdmin])

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
                        <Button className="spacial-button" variant="primary" onClick={playQuip}>New</Button>}</h3>
                <Modal show={showModal} onHide={closeModal} ref={microphoneRef} onShow={startListener}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Task</Modal.Title>
                        {isListening ? (
                            <div className="led-green" ref={microphoneRef} onClick={stopListener}>
                            </div>
                        ) : (
                            <div className="led-red" ref={microphoneRef} onClick={startListener}>
                            </div>
                        )}
                        {/* <div>{transcript}</div> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter type" defaultValue={tmpType} id="type" name="type"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Priority</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter priority" defaultValue={tmpPriority} id="priority" name="priority"/>
                            </Form.Group>
                            <Form.Group controlId="due">
                                <Form.Label><b>Due</b></Form.Label>
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group controlId="completed">
                                <Form.Label><b>Completed</b></Form.Label>
                                <DatePicker
                                    selected={completeDate}
                                    onChange={(date) => setCompleteDate(date)}
                                    name="completed"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Trigger</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter trigger" defaultValue={tmpTrigger} id="trigger" name="trigger"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Note</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter note" defaultValue={tmpNote} id="note" name="note"/>
                            </Form.Group>
                            <Button className="buttonMargin" variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={closeModal}>
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
