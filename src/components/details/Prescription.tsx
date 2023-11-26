/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MedicalService from "../../services/medical.service.ts";
import Prescription from "../../types/prescription.type.ts";
import { Button, Modal } from 'react-bootstrap';

const PrescriptionDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [rx, setRx] = useState<Prescription>();
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

        MedicalService.getPrescription(parseInt(id))
            .then((response) => {
                setRx(response.data);
            })

    }, []);

    if (!rx) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Prescription Details</h1>
                <p>This is where we show the entire Prescription Object</p>
                <a className="btn btn-primary" href="#" role="button">
                    Edit
                </a>
                <div className="detail-div">
                    <div><strong>id: </strong> {param}</div>
                    <div><strong>identNo:</strong> {rx.name}</div>
                    <div><strong>size:</strong> {rx.size}</div>
                    <div><strong>form:</strong> {rx.form}</div>
                    <div><strong>rxUnit:</strong> {rx.rxUnit}</div>
                    <div><strong>quantity:</strong> {rx.quantity}</div>
                    <div><strong>pharmacy:</strong> {rx.pharmacy}</div>
                    <div><strong>pharmacyPhone:</strong> {rx.pharmacyPhone}</div>
                    <div><strong>written:</strong> {rx.written}</div>
                    <div><strong>writtenBy:</strong> {rx.writtenBy}</div>
                    <div><strong>filled:</strong> {rx.filled}</div>
                    <div><strong>expired:</strong> {rx.expired}</div>
                    <div><strong>refillNote:</strong> {rx.refillNote}</div>
                    <div><strong>manufacturedBy:</strong> {rx.manufacturedBy}</div>
                    <div><strong>note:</strong> {rx.note}</div>
                    <div><strong>userKey:</strong> {rx.userKey}</div>
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

export default PrescriptionDetails;
