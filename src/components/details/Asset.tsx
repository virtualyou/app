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
import Asset from "../../types/asset.type.ts";
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const AssetDetails: React.FC = () => {

    const location = useLocation();
    const [param, setParam] = useState("");
    const [asset, setAsset] = useState<Asset>();
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    // modal state
    const handleOkay = () => {
        FinancialService.deleteAsset(parseInt(param));
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

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Asset Details</h1>
                <p>This is where we show the entire Asset Object</p>
                <a className="btn btn-primary" href="#" role="button">
                    Edit
                </a>
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

export default AssetDetails;
