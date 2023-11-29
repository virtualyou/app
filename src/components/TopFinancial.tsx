/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import FinancialService from "../services/financial.service.ts";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import {Button, Form, Modal} from "react-bootstrap";
import React, {useState,useEffect} from "react";
import CreateAsset from "../types/createasset.type.ts";
import CreateDebt from "../types/createdebt.type.ts";

const TopFinancial = () => {
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [showAssetCreate, setShowAssetCreate] = useState(false);
    const [showDebtCreate, setShowDebtCreate] = useState(false);

    // crude refresh
    function refreshPage() {
        window.location.reload();
    }

    // create asset popup modal
    const handleAssetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAssetValues: CreateAsset = {
            name: formData.get('name') as string,
            assetType: formData.get('assetType') as string,
            accountNo: formData.get('accountNo') as string,
            website: formData.get('website') as string,
            websiteUser: formData.get('websiteUser') as string,
            websitePassword: formData.get('websitePassword') as string,
            holdingCompany: formData.get('holdingCompany') as string,
            holdingCompanyAddress: formData.get('holdingCompanyAddress') as string,
            holdingCompanyPhone: formData.get('holdingCompanyPhone') as string,
            balance: formData.get('balance') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        FinancialService.createAsset(formAssetValues);
        handleAssetCreateClose();
        refreshPage();
        //goBack();
    };

    const handleAssetCreateClose = () => {
        return setShowAssetCreate(false);
    }

    const showAssetCreatePop = () => {
        return setShowAssetCreate(true);
    }

    const openAssetCreate = () => {
        return showAssetCreatePop();
    }

    // create debt popup modal
    const handleDebtSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDebtValues: CreateDebt = {
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
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        FinancialService.createDebt(formDebtValues);
        handleDebtCreateClose();
        refreshPage();
        //goBack();
    };

    const handleDebtCreateClose = () => {
        return setShowDebtCreate(false);
    }

    const showDebtCreatePop = () => {
        return setShowDebtCreate(true);
    }

    const openDebtCreate = () => {
        return showDebtCreatePop();
    }

    useEffect(() => {
        FinancialService.getAssets()
            .then((response) => {
                setAssets(response.data);
            })
    }, [])

    useEffect(() => {
        FinancialService.getDebts()
            .then((response) => {
                setDebts(response.data);
            })
    }, [])

    if (!assets || !debts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Financial</h1>
                <p>This is where we work with the financials.</p>

                <h3 className="font-weight-light">Assets
                <Button className="spacial-button" variant="primary" onClick={openAssetCreate}>New</Button></h3>
                <Modal show={showAssetCreate} onHide={handleAssetCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Asset Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAssetSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Asset Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter asset type" id="assetType" name="assetType"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Account Number</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter account number" id="accountNo" name="accountNo"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Website</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website" id="website" name="website"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Web Site User</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website user" id="websiteUser" name="websiteUser"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Web Site Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter website password" id="websitePassword" name="websitePassword"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Holding Company</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company" id="holdingCompany" name="holdingCompany"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Holding Company Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company address" id="holdingCompanyAddress" name="holdingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company phone" id="holdingCompanyPhone" name="holdingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Balance</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter balance" id="balance" name="balance"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={handleAssetCreateClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <AssetDisplay data={assets} />

                <h3 className="font-weight-light">Debts
                    <Button className="spacial-button" variant="primary" onClick={openDebtCreate}>New</Button></h3>
                <Modal show={showDebtCreate} onHide={handleDebtCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Debt Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleDebtSubmit}>
                            <Form.Group controlId="form11">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form12">
                                <Form.Label><b>Debt Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter debt type" id="debtType" name="debtType"/>
                            </Form.Group>
                            <Form.Group controlId="form13">
                                <Form.Label><b>Account Number</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter account number" id="accountNo" name="accountNo"/>
                            </Form.Group>
                            <Form.Group controlId="form14">
                                <Form.Label><b>Website</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website" id="website" name="website"/>
                            </Form.Group>
                            <Form.Group controlId="form15">
                                <Form.Label><b>Web Site User</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website user" id="websiteUser" name="websiteUser"/>
                            </Form.Group>
                            <Form.Group controlId="form16">
                                <Form.Label><b>Web Site Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter website password" id="websitePassword" name="websitePassword"/>
                            </Form.Group>
                            <Form.Group controlId="form17">
                                <Form.Label><b>Holding Company</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company" id="holdingCompany" name="holdingCompany"/>
                            </Form.Group>
                            <Form.Group controlId="form18">
                                <Form.Label><b>Holding Company Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company address" id="holdingCompanyAddress" name="holdingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group controlId="form19">
                                <Form.Label><b>Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company phone" id="holdingCompanyPhone" name="holdingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form20">
                                <Form.Label><b>Balance</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter balance" id="balance" name="balance"/>
                            </Form.Group>
                            <Form.Group controlId="form21">
                                <Form.Label><b>Frequency</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter frequency" id="frequency" name="frequency"/>
                            </Form.Group>
                            <Form.Group controlId="form22">
                                <Form.Label><b>Due</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter payment due date" id="due" name="due"/>
                            </Form.Group>
                            <Form.Group controlId="form23">
                                <Form.Label><b>Payment</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter payment" id="payment" name="payment"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button variant="secondary" onClick={handleDebtCreateClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <DebtDisplay data={debts} />
            </header>
        </div>
    );
};

export default TopFinancial;
