/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import './custom.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FinancialService from "../../services/financial.service.ts";
import Debt from "../../types/debt.type.ts";
import {Button, Form, Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";
import {DateSelector} from "../DateSelector.tsx";

const DebtDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [debt, setDebt] = useState<Debt>();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = () => {
        FinancialService.deleteDebt(parseInt(param));
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
        const formDebtValues: Debt = {
            id: parseInt(param),
            name: formData.get('name') as string,
            debtType: formData.get('debtType') as string,
            accountNo: formData.get('accountNo') as string,
            website: formData.get('website') as string,
            websiteUser: formData.get('websiteUser') as string,
            websitePassword: formData.get('websitePassword') as string,
            holdingCompany: formData.get('holdingCompany') as string,
            holdingCompanyAddress: formData.get('holdingCompanyAddress') as string,
            holdingCompanyPhone: formData.get('holdingCompanyPhone') as string,
            balance: formData.get('balance') as string,
            frequency: formData.get('frequency') as string,
            due: formData.get('due') as string,
            payment: formData.get('payment') as string,
            userKey: userkey
        };
        FinancialService.updateDebt(parseInt(param), formDebtValues);
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

        FinancialService.getDebt(parseInt(id))
            .then((response) => {
                setDebt(response.data);
            })

    }, []);

    if (!debt) {
        return <div>Loading...</div>;
    }

    const userkey = debt.userKey;
    const user = AuthService.getCurrentUser();

    const DateSelectorControl = React.forwardRef((props, ref) => {
        return (
            <Form.Control {...props} type="date-selector" name="due">
                <DateSelector />
            </Form.Control>
        );
    });

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Debt Details</h1>
                <p>This is where we show the entire Debt Object</p>
                {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                    <Button className="spacial-button" variant="primary" onClick={openEdit}>Edit</Button>}
                <Button className="spacial-button" variant="secondary" onClick={goBack}>Back</Button>
                <Modal show={showEdit} onHide={handleEditorClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Asset Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.name} name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Debt Type</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.debtType} name="debtType"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Account Number</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.accountNo} name="accountNo"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Website</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.website} name="website"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Web Site User</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.websiteUser} name="websiteUser"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Web Site Password</b></Form.Label>
                                <Form.Control type="password" defaultValue={debt.websitePassword} name="websitePassword"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Holding Company</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.holdingCompany} name="holdingCompany"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Holding Company Address</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.holdingCompanyAddress} name="holdingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.holdingCompanyPhone} name="holdingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Balance</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.balance} name="balance"/>
                            </Form.Group>
                            <Form.Group controlId="form11">
                                <Form.Label><b>Frequency</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.frequency} name="frequency"/>
                            </Form.Group>
                            <Form.Group controlId="form12">
                                <Form.Label><b>Due</b></Form.Label>
                                <DateSelector />
                            </Form.Group>
                            <Form.Group controlId="form13">
                                <Form.Label><b>Payment</b></Form.Label>
                                <Form.Control type="text" defaultValue={debt.payment} name="payment"/>
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
                {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                    <Button variant="danger" onClick={openModal}>Delete</Button>}
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
