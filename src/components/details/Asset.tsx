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

Task.tsx - Detail page for single Task
@author David L Whitehurst

*/

import './custom.css';
import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FinancialService from "../../services/financial.service.ts";
import Asset from "../../types/asset.type.ts";
import {Button, Form, Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service.ts";

const AssetDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [asset, setAsset] = useState<Asset>();
    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = async () => {
        try {
            await FinancialService.deleteAsset(parseInt(param));
        } catch (error) {
            console.error(error);
        }
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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAssetValues: Asset = {
            id: parseInt(param),
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
            userKey: userkey
        };
        try {
            await FinancialService.updateAsset(parseInt(param), formAssetValues);
        } catch(error) {
            console.error(error);
        }

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

        FinancialService.getAsset(parseInt(id))
            .then((response) => {
                setAsset(response.data);
            })

    }, []);

    if (!asset) {
        return <div>Loading...</div>;
    }

    const userkey = asset.userKey;
    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Asset Details</h1>
                <p>This is where we show the entire Asset Object</p>
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
                                <Form.Control type="text" defaultValue={asset.name} name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Asset Type</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.assetType} name="assetType"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Account Number</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.accountNo} name="accountNo"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Website</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.website} name="website"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Web Site User</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.websiteUser} name="websiteUser"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Web Site Password</b></Form.Label>
                                <Form.Control type="password" defaultValue={asset.websitePassword} name="websitePassword"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Holding Company</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.holdingCompany} name="holdingCompany"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Holding Company Address</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.holdingCompanyAddress} name="holdingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.holdingCompanyPhone} name="holdingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Balance</b></Form.Label>
                                <Form.Control type="text" defaultValue={asset.balance} name="balance"/>
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
                    <div><strong>name:</strong> {asset.name}</div>
                    <div><strong>assetType:</strong> {asset.assetType}</div>
                    <div><strong>accountNo:</strong> {asset.accountNo}</div>
                    <div><strong>website:</strong> {asset.website}</div>
                    <div><strong>websiteUser:</strong> {asset.websiteUser}</div>
                    <div><strong>websitePassword:</strong> {asset.websitePassword}</div>
                    <div><strong>holdingCompany:</strong> {asset.holdingCompany}</div>
                    <div><strong>holdingCompanyAddress:</strong> {asset.holdingCompanyAddress}</div>
                    <div><strong>holdingCompanyPhone:</strong> {asset.holdingCompanyPhone}</div>
                    <div><strong>balance:</strong> {asset.balance}</div>
                    <div><strong>userKey:</strong> {asset.userKey}</div>
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

export default AssetDetails;
