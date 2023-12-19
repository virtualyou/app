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

TopFinancial.tsx - All Financial page (component)
@author David L Whitehurst

*/

import FinancialService from "../services/financial.service.ts";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import {Button, Form, Modal} from "react-bootstrap";
import React, {useState, useEffect, useRef} from "react";
import CreateAsset from "../types/createasset.type.ts";
import CreateDebt from "../types/createdebt.type.ts";
import AuthService from "../services/auth.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./custom.css";

const ASSET_TALK = import.meta.env.VITE_APP_BASEPATH + "/speech/v1/assist/create/asset"
const DEBT_TALK = import.meta.env.VITE_APP_BASEPATH + "/speech/v1/assist/create/debt"
const TopFinancial = () => {
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [showAssetModal, setShowAssetModal] = useState(false);
    const [showDebtModal, setShowDebtModal] = useState(false);
    const [refreshAsset, setRefreshAsset] = useState(0);
    const [refreshDebt, setRefreshDebt] = useState(0);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    const [tmpName, setTmpName] = useState('');
    const [tmpAssetType, setTmpAssetType] = useState('');
    const [tmpDebtType, setTmpDebtType] = useState('');
    const [tmpAccountNo, setTmpAccountNo] = useState('');
    const [tmpWebsite, setTmpWebsite] = useState('');
    const [tmpWebsiteUser, setTmpWebsiteUser] = useState('');
    const [tmpWebsitePassword, setTmpWebsitePassword] = useState('');
    const [tmpHoldingCompany, setTmpHoldingCompany] = useState('');
    const [tmpHoldingCompanyAddress, setTmpHoldingCompanyAddress] = useState('');
    const [tmpHoldingCompanyPhone, setTmpHoldingCompanyPhone] = useState('');
    const [tmpBalance, setTmpBalance] = useState('');
    const [tmpFrequency, setTmpFrequency] = useState('');
    const [tmpPayment, setTmpPayment] = useState('');

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
        closeAssetModal();
        setRefreshAsset(oldVal => oldVal +1);
    };

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
        }
        console.log(formDebtValues);
        FinancialService.createDebt(formDebtValues);
        closeDebtModal();
        setRefreshDebt(oldVal => oldVal +1);
    };

    // declare speech recognition
    const commands = [
        {
            command: 'The name is *',
            callback: (name: string) => setTmpName(name)
        },
        {
            command: 'The asset type is *',
            callback: (assettype: string) => setTmpAssetType(assettype)
        },
        {
            command: 'The debt type is *',
            callback: (debttype: string) => setTmpDebtType(debttype)
        },
        {
            command: 'The account number is *',
            callback: (accountno: string) => setTmpAccountNo(accountno)
        },
        {
            command: 'The website is *',
            callback: (website: string) => setTmpWebsite(website)
        },
        {
            command: 'The website user is *',
            callback: (webuser: string) => setTmpWebsiteUser(webuser)
        },
        {
            command: 'The website password is *',
            callback: (webpass: string) => setTmpWebsitePassword(webpass)
        },
        {
            command: 'The holding company is *',
            callback: (hcomp: string) => setTmpHoldingCompany(hcomp)
        },
        {
            command: 'The holding company address is *',
            callback: (hcompaddr: string) => setTmpHoldingCompanyAddress(hcompaddr)
        },
        {
            command: 'The holding company phone is *',
            callback: (hcompphone: string) => setTmpHoldingCompanyPhone(hcompphone)
        },
        {
            command: 'The balance is *',
            callback: (balance: string) => setTmpBalance(balance)
        },
        {
            command: 'The frequency is *',
            callback: (freq: string) => setTmpFrequency(freq)
        },
        {
            command: 'The payment is *',
            callback: (payment: string) => setTmpPayment(payment)
        },

    ]

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({commands});

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="mircophone-container">
                Browser does not Support Speech Recognition.
            </div>
        );
    }

    const playAssetQuip = async () => {
        const audio = new Audio(ASSET_TALK);
        await audio.play(); // must be asynchronous
        audio.onended = function() {
            setShowAssetModal(true);
        };
    }

    const playDebtQuip = async () => {
        const audio = new Audio(DEBT_TALK);
        await audio.play(); // must be asynchronous
        audio.onended = function() {
            setShowDebtModal(true);
        };
    }

    // only one listener per page
    const startListener = () => {
        flushTmpState();
        resetTranscript();
        setIsListening(true);
        // @ts-ignore
        microphoneRef.current.classList.add("listening");
        SpeechRecognition.startListening({
            continuous: true,
        });
    };
    const stopListener = () => {
        setIsListening(false);
        // @ts-ignore
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopListener();
        resetTranscript();
        flushTmpState();
    };

    const flushTmpState = () => {
        setTmpName('');
        setTmpAssetType('');
        setTmpDebtType('');
        setTmpAccountNo('');
        setTmpWebsite('');
        setTmpWebsiteUser('');
        setTmpWebsitePassword('');
        setTmpHoldingCompany('');
        setTmpHoldingCompanyAddress('');
        setTmpHoldingCompanyPhone('');
        setTmpBalance('');
        setTmpFrequency('');
        setTmpPayment('');
    }

    const closeAssetModal = () => {
        return setShowAssetModal(false);
    }

    const closeDebtModal = () => {
        return setShowDebtModal(false);
    }

    useEffect(() => {
        FinancialService.getAssets()
            .then((response) => {
                setAssets(response.data);
            })
    }, [refreshAsset])

    useEffect(() => {
        FinancialService.getDebts()
            .then((response) => {
                setDebts(response.data);
            })
    }, [refreshDebt])

    if (!assets || !debts) {
        return <div>Loading...</div>;
    }

    const user = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Financial</h1>
                <p>This is where we work with the financials.</p>
                <h3 className="font-weight-light">Assets
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={playAssetQuip}>New</Button>}</h3>
                <Modal show={showAssetModal} onHide={closeAssetModal} ref={microphoneRef} onShow={startListener}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Asset</Modal.Title>
                        {isListening ? (
                            <div className="led-green" ref={microphoneRef} onClick={stopListener}>
                            </div>
                        ) : (
                            <div className="led-red" ref={microphoneRef} onClick={startListener}>
                            </div>
                        )}
                        <div>{transcript}</div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAssetSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Asset Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter asset type" defaultValue={tmpAssetType} id="assetType" name="assetType"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Account Number</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter account number" defaultValue={tmpAccountNo} id="accountNo" name="accountNo"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Website</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website" defaultValue={tmpWebsite} id="website" name="website"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Web Site User</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website user" defaultValue={tmpWebsiteUser} id="websiteUser" name="websiteUser"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Web Site Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter website password" defaultValue={tmpWebsitePassword} id="websitePassword" name="websitePassword"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Holding Company</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company" defaultValue={tmpHoldingCompany} id="holdingCompany" name="holdingCompany"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Holding Company Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company address" defaultValue={tmpHoldingCompanyAddress} id="holdingCompanyAddress" name="holdingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company phone" defaultValue={tmpHoldingCompanyPhone} id="holdingCompanyPhone" name="holdingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Balance</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter balance" defaultValue={tmpBalance} id="balance" name="balance"/>
                            </Form.Group>
                            <Button className="buttonMargin" variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={closeAssetModal}>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <AssetDisplay data={assets} />

                <h3 className="font-weight-light">Debts
                    {user.roles.includes(("ROLE_MONITOR")) ? <meta/> :
                        <Button className="spacial-button" variant="primary" onClick={playDebtQuip}>New</Button>}</h3>
                <Modal show={showDebtModal} onHide={closeDebtModal} ref={microphoneRef} onShow={startListener}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Debt</Modal.Title>
                        {isListening ? (
                            <div className="led-green" ref={microphoneRef} onClick={stopListener}>
                            </div>
                        ) : (
                            <div className="led-red" ref={microphoneRef} onClick={startListener}>
                            </div>
                        )}
                        <div>{transcript}</div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleDebtSubmit}>
                            <Form.Group controlId="form1">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpName} id="name" name="name"/>
                            </Form.Group>
                            <Form.Group controlId="form2">
                                <Form.Label><b>Debt Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter debt type" defaultValue={tmpDebtType} id="debtType" name="debtType"/>
                            </Form.Group>
                            <Form.Group controlId="form3">
                                <Form.Label><b>Account Number</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter account number" defaultValue={tmpAccountNo} id="accountNo" name="accountNo"/>
                            </Form.Group>
                            <Form.Group controlId="form4">
                                <Form.Label><b>Website</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website" defaultValue={tmpWebsite} id="website" name="website"/>
                            </Form.Group>
                            <Form.Group controlId="form5">
                                <Form.Label><b>Web Site User</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website user" defaultValue={tmpWebsiteUser} id="websiteUser" name="websiteUser"/>
                            </Form.Group>
                            <Form.Group controlId="form6">
                                <Form.Label><b>Web Site Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter website password" defaultValue={tmpWebsitePassword} id="websitePassword" name="websitePassword"/>
                            </Form.Group>
                            <Form.Group controlId="form7">
                                <Form.Label><b>Holding Company</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company" defaultValue={tmpHoldingCompany} id="holdingCompany" name="holdingCompany"/>
                            </Form.Group>
                            <Form.Group controlId="form8">
                                <Form.Label><b>Holding Company Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company address" defaultValue={tmpHoldingCompanyAddress} id="holdingCompanyAddress" name="holdingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group controlId="form9">
                                <Form.Label><b>Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company phone" defaultValue={tmpHoldingCompanyPhone} id="holdingCompanyPhone" name="holdingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group controlId="form10">
                                <Form.Label><b>Balance</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter balance" defaultValue={tmpBalance} id="balance" name="balance"/>
                            </Form.Group>
                            <Form.Group controlId="form11">
                                <Form.Label><b>Frequency</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter frequency" defaultValue={tmpFrequency} id="frequency" name="frequency"/>
                            </Form.Group>
                            <Form.Group controlId="form12">
                                <Form.Label><b>Due</b></Form.Label>
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group controlId="form13">
                                <Form.Label><b>Payment</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter payment" defaultValue={tmpPayment} id="payment" name="payment"/>
                            </Form.Group>
                            <Button className="buttonMargin" variant="primary" type="submit">
                                Submit
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={handleReset}>
                                Reset
                            </Button>&nbsp;
                            <Button className="buttonMargin" variant="secondary" onClick={closeDebtModal}>
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
