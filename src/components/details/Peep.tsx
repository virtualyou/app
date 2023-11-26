/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PersonalService from "../../services/personal.service.ts";
import Peep from "../../types/peep.type.ts";
import { Button, Modal } from 'react-bootstrap';

const PeepDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [peep, setPeep] = useState<Peep>();
    const [showModal, setShowModal] = useState(false);

    // modal state
    const handleOkay = () => {
        //FinancialService.deleteAsset(someId);
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

        PersonalService.getPeep(parseInt(id))
            .then((response) => {
                setPeep(response.data);
            })

    }, []);

    if (!peep) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Contact Details</h1>
                <p>This is where we show the entire Contact Object</p>
                <a className="btn btn-primary" href="#" role="button">
                    Edit
                </a>
                <div className="detail-div">
                    <div><strong>id: </strong> {param}</div>
                    <div><strong>name:</strong> {peep.name}</div>
                    <div><strong>phone1:</strong> {peep.phone1}</div>
                    <div><strong>phone2:</strong> {peep.phone2}</div>
                    <div><strong>email:</strong> {peep.email}</div>
                    <div><strong>address:</strong> {peep.address}</div>
                    <div><strong>note:</strong> {peep.note}</div>
                    <div><strong>userKey:</strong> {peep.userKey}</div>
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

export default PeepDetails;
