/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FinancialService from "../../services/financial.service.ts";
import Debt from "../../types/debt.type.ts";
import { Button, Modal } from 'react-bootstrap';

const DebtDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [debt, setDebt] = useState<Debt>();
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

        FinancialService.getDebt(parseInt(id))
            .then((response) => {
                setDebt(response.data);
            })

    }, []);

    if (!debt) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Debt Details</h1>
                <p>This is where we show the entire Debt Object</p>
                <a className="btn btn-primary" href="#" role="button">
                    Edit
                </a>
                <div className="detail-div">
                    <div><strong>id: </strong> {param}</div>
                    <div><strong>name:</strong> {debt.name}</div>
                    <div><strong>debtType:</strong> {debt.debtType}</div>
                    <div><strong>accountNo:</strong> {debt.accountNo}</div>
                    <div><strong>website:</strong> {debt.website}</div>
                    <div><strong>websiteUser:</strong> {debt.websiteUser}</div>
                    <div><strong>websitePassword:</strong> {debt.websitePassword}</div>
                    <div><strong>holdingCompany:</strong> {debt.holdingCompany}</div>
                    <div><strong>holdingCompanyAddress:</strong> {debt.holdingCompanyAddress}</div>
                    <div><strong>holdingCompanyPhone:</strong> {debt.holdingCompanyPhone}</div>
                    <div><strong>balance:</strong> {debt.balance}</div>
                    <div><strong>frequency:</strong> {debt.frequency}</div>
                    <div><strong>due:</strong> {debt.due}</div>
                    <div><strong>payment:</strong> {debt.payment}</div>
                    <div><strong>userKey:</strong> {debt.userKey}</div>
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

export default DebtDetails;
