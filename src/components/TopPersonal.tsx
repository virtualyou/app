/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import React, {useEffect, useState} from "react";
import CreatePeep from "../types/createpeep.type.ts";
import PersonalService from "../services/personal.service.ts";
import {Button, Form, Modal} from "react-bootstrap";
import PeepDisplay from "./display/PeepDisplay.tsx";

const TopPersonal = () => {
    const [peeps, setPeeps] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // crude refresh
    function refreshPage() {
        window.location.reload();
    }

    // create popup modal
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formPeepValues: CreatePeep = {
            name: formData.get('name') as string,
            phone1: formData.get('phone1') as string,
            phone2: formData.get('phone2') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            note: formData.get('note') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        PersonalService.createPeep(formPeepValues);
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
        PersonalService.getPeeps()
            .then((response) => {
                setPeeps(response.data);
            })
    }, [])

    if (!peeps) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Personal</h1>
                <p>This is where we keep things closest to us.</p>
                <h3 className="font-weight-light">Contacts
                    <Button className="spacial-button" variant="primary" onClick={openCreate}>New</Button></h3>
                <Modal show={showCreate} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Contact Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Phone1</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter phone1" id="phone1" name="phone1"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Phone2</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter phone2" id="phone2" name="phone2"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter email" id="email" name="email"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter address" id="address" name="address"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
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
                <PeepDisplay data={peeps} />
            </header>
        </div>
    );
};

export default TopPersonal;
