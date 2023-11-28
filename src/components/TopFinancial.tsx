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

const TopFinancial = () => {
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // crude refresh
    function refreshPage() {
        window.location.reload();
    }

    // editor popup modal
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
            userKey: 7
        };
        FinancialService.createAsset(formAssetValues);
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
                    <Button className="spacial-button" variant="primary" onClick={openCreate}>New</Button></h3>
                <Modal show={showCreate} onHide={handleCreateClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Asset Create</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
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
                            <Button variant="secondary" onClick={handleCreateClose}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <AssetDisplay data={assets} />

                <h3 className="font-weight-light">Debts <Button className="spacial-button" variant="primary">New</Button></h3>
                <DebtDisplay data={debts} />
            </header>
        </div>
    );
};

export default TopFinancial;
