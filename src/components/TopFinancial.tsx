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
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);
    const [tmpAssetName, setTmpAssetName] = useState('');
    const [tmpDebtName, setTmpDebtName] = useState('');
    const [tmpAssetType, setTmpAssetType] = useState('');
    const [tmpDebtType, setTmpDebtType] = useState('');
    const [tmpAssetAccountNo, setTmpAssetAccountNo] = useState('');
    const [tmpDebtAccountNo, setTmpDebtAccountNo] = useState('');
    const [tmpAssetWebsite, setTmpAssetWebsite] = useState('');
    const [tmpDebtWebsite, setTmpDebtWebsite] = useState('');
    const [tmpAssetWebsiteUser, setTmpAssetWebsiteUser] = useState('');
    const [tmpDebtWebsiteUser, setTmpDebtWebsiteUser] = useState('');
    const [tmpAssetWebsitePassword, setTmpAssetWebsitePassword] = useState('');
    const [tmpDebtWebsitePassword, setTmpDebtWebsitePassword] = useState('');
    const [tmpAssetHoldingCompany, setTmpAssetHoldingCompany] = useState('');
    const [tmpDebtHoldingCompany, setTmpDebtHoldingCompany] = useState('');
    const [tmpAssetHoldingCompanyAddress, setTmpAssetHoldingCompanyAddress] = useState('');
    const [tmpDebtHoldingCompanyAddress, setTmpDebtHoldingCompanyAddress] = useState('');
    const [tmpAssetHoldingCompanyPhone, setTmpAssetHoldingCompanyPhone] = useState('');
    const [tmpDebtHoldingCompanyPhone, setTmpDebtHoldingCompanyPhone] = useState('');
    const [tmpAssetBalance, setTmpAssetBalance] = useState('');
    const [tmpDebtBalance, setTmpDebtBalance] = useState('');
    const [tmpDebtFrequency, setTmpDebtFrequency] = useState('');
    const [tmpDebtPayment, setTmpDebtPayment] = useState('');

    // create asset popup modal
    const handleAssetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formAssetValues: CreateAsset = {
            name: formData.get('assetName') as string,
            assetType: formData.get('assetType') as string,
            accountNo: formData.get('assetAccountNo') as string,
            website: formData.get('assetWebsite') as string,
            websiteUser: formData.get('assetWebsiteUser') as string,
            websitePassword: formData.get('assetWebsitePassword') as string,
            holdingCompany: formData.get('assetHoldingCompany') as string,
            holdingCompanyAddress: formData.get('assetHoldingCompanyAddress') as string,
            holdingCompanyPhone: formData.get('assetHoldingCompanyPhone') as string,
            balance: formData.get('assetBalance') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        };
        try {
            await FinancialService.createAsset(formAssetValues);
        } catch (error) {
            console.error(error);
        }

        await handleReset();
        closeAssetModal();
        setRefreshAsset(oldVal => oldVal +1);
    };

    // create debt popup modal
    const handleDebtSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let due;
        if (formData.get('due') === "") {
            due = null;
        } else {
            due = formData.get('due') as string;
        }

        const formDebtValues: CreateDebt = {
            name: formData.get('debtName') as string,
            debtType: formData.get('debtType') as string,
            accountNo: formData.get('debtAccountNo') as string,
            website: formData.get('debtWebsite') as string,
            websiteUser: formData.get('debtWebsiteUser') as string,
            websitePassword: formData.get('debtWebsitePassword') as string,
            holdingCompany: formData.get('debtHoldingCompany') as string,
            holdingCompanyAddress: formData.get('debtHoldingCompanyAddress') as string,
            holdingCompanyPhone: formData.get('debtHoldingCompanyPhone') as string,
            balance: formData.get('debtBalance') as string,
            frequency: formData.get('debtFrequency') as string,
            due: due,
            payment: formData.get('debtPayment') as string,
            userKey: parseInt(localStorage.getItem("ownerid") || "0")
        }

        try {
            await FinancialService.createDebt(formDebtValues);
        } catch (error) {
            console.error(error);
        }

        await handleReset();
        closeDebtModal();
        setRefreshDebt(oldVal => oldVal +1);
    };

    // declare speech recognition
    const commands = [
        {
            command: 'The asset name is *',
            callback: (name: string) => setTmpAssetName(name)
        },
        {
            command: 'The debt name is *',
            callback: (name: string) => setTmpDebtName(name)
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
            command: 'The asset account number is *',
            callback: (accountno: string) => setTmpAssetAccountNo(accountno)
        },
        {
            command: 'The debt account number is *',
            callback: (accountno: string) => setTmpDebtAccountNo(accountno)
        },
        {
            command: 'The asset website is *',
            callback: (website: string) => setTmpAssetWebsite(website)
        },
        {
            command: 'The debt website is *',
            callback: (website: string) => setTmpDebtWebsite(website)
        },
        {
            command: 'The asset website user is *',
            callback: (webuser: string) => setTmpAssetWebsiteUser(webuser)
        },
        {
            command: 'The debt website user is *',
            callback: (webuser: string) => setTmpDebtWebsiteUser(webuser)
        },
        {
            command: 'The asset website password is *',
            callback: (webpass: string) => setTmpAssetWebsitePassword(webpass)
        },
        {
            command: 'The debt website password is *',
            callback: (webpass: string) => setTmpDebtWebsitePassword(webpass)
        },
        {
            command: 'The asset holding company is *',
            callback: (hcomp: string) => setTmpAssetHoldingCompany(hcomp)
        },
        {
            command: 'The debt holding company is *',
            callback: (hcomp: string) => setTmpDebtHoldingCompany(hcomp)
        },
        {
            command: 'The asset holding company address is *',
            callback: (hcompaddr: string) => setTmpAssetHoldingCompanyAddress(hcompaddr)
        },
        {
            command: 'The debt holding company address is *',
            callback: (hcompaddr: string) => setTmpDebtHoldingCompanyAddress(hcompaddr)
        },
        {
            command: 'The asset holding company phone is *',
            callback: (hcompphone: string) => setTmpAssetHoldingCompanyPhone(hcompphone)
        },
        {
            command: 'The debt holding company phone is *',
            callback: (hcompphone: string) => setTmpDebtHoldingCompanyPhone(hcompphone)
        },
        {
            command: 'The asset balance is *',
            callback: (balance: string) => setTmpAssetBalance(balance)
        },
        {
            command: 'The debt balance is *',
            callback: (balance: string) => setTmpDebtBalance(balance)
        },
        {
            command: 'The debt frequency is *',
            callback: (freq: string) => setTmpDebtFrequency(freq)
        },
        {
            command: 'The debt payment is *',
            callback: (payment: string) => setTmpDebtPayment(payment)
        },

    ]
    // removing transcript
    const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({commands});

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
    const startListener = async () => {
        flushTmpState();
        resetTranscript();
        setIsListening(true);
        // @ts-ignore
        microphoneRef.current.classList.add("listening")
        try {
            await SpeechRecognition.startListening({
                continuous: true,
            });
        } catch (error) {
            console.error(error);
        }
    };
    const stopListener = async () => {
        setIsListening(false);
        // @ts-ignore
        microphoneRef.current.classList.remove("listening");
        try {
            await SpeechRecognition.stopListening();
        } catch (error) {
            console.error(error);
        }
    };
    const handleReset = async () => {
        await stopListener();
        resetTranscript();
        flushTmpState();
    };

    const flushTmpState = () => {
        setTmpAssetName('');
        setTmpDebtName('');
        setTmpAssetType('');
        setTmpDebtType('');
        setTmpAssetAccountNo('');
        setTmpDebtAccountNo('');
        setTmpAssetWebsite('');
        setTmpDebtWebsite('');
        setTmpAssetWebsiteUser('');
        setTmpDebtWebsiteUser('');
        setTmpAssetWebsitePassword('');
        setTmpDebtWebsitePassword('');
        setTmpAssetHoldingCompany('');
        setTmpDebtHoldingCompany('');
        setTmpAssetHoldingCompanyAddress('');
        setTmpDebtHoldingCompanyAddress('');
        setTmpAssetHoldingCompanyPhone('');
        setTmpDebtHoldingCompanyPhone('');
        setTmpAssetBalance('');
        setTmpDebtBalance('');
        setTmpDebtFrequency('');
        setTmpDebtPayment('');
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
                        {/* <div>{transcript}</div> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleAssetSubmit}>
                            <Form.Group>
                                <Form.Label><b>Asset Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpAssetName} id="assetName" name="assetName"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter asset type" defaultValue={tmpAssetType} id="assetType" name="assetType"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Account Number</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter account number" defaultValue={tmpAssetAccountNo} id="assetAccountNo" name="assetAccountNo"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Website</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website" defaultValue={tmpAssetWebsite} id="assetWebsite" name="assetWebsite"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Web Site User</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website user" defaultValue={tmpAssetWebsiteUser} id="assetWebsiteUser" name="assetWebsiteUser"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Web Site Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter website password" defaultValue={tmpAssetWebsitePassword} id="assetWebsitePassword" name="assetWebsitePassword"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Holding Company</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company" defaultValue={tmpAssetHoldingCompany} id="assetHoldingCompany" name="assetHoldingCompany"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Holding Company Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company address" defaultValue={tmpAssetHoldingCompanyAddress} id="assetHoldingCompanyAddress-a" name="assetHoldingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company phone" defaultValue={tmpAssetHoldingCompanyPhone} id="assetHoldingCompanyPhone-a" name="assetHoldingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Asset Balance</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter balance" defaultValue={tmpAssetBalance} id="assetBalance" name="assetBalance"/>
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
                        {/* <div>{transcript}</div> */}
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleDebtSubmit}>
                            <Form.Group>
                                <Form.Label><b>Debt Name</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter name" defaultValue={tmpDebtName} id="debtName" name="debtName"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Type</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter debt type" defaultValue={tmpDebtType} id="debtType" name="debtType"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Account Number</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter account number" defaultValue={tmpDebtAccountNo} id="debtAccountNo" name="debtAccountNo"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Website</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website" defaultValue={tmpDebtWebsite} id="debtWebsite" name="debtWebsite"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Web Site User</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter website user" defaultValue={tmpDebtWebsiteUser} id="debtWebsiteUser" name="debtWebsiteUser"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Web Site Password</b></Form.Label>
                                <Form.Control type="password" placeholder="Enter website password" defaultValue={tmpDebtWebsitePassword} id="debtWebsitePassword" name="debtWebsitePassword"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Holding Company</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company" defaultValue={tmpDebtHoldingCompany} id="debtHoldingCompany" name="debtHoldingCompany"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Holding Company Address</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company address" defaultValue={tmpDebtHoldingCompanyAddress} id="debtHoldingCompanyAddress" name="debtHoldingCompanyAddress"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Holding Company Phone</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter holding company phone" defaultValue={tmpDebtHoldingCompanyPhone} id="debtHoldingCompanyPhone" name="debtHoldingCompanyPhone"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Balance</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter balance" defaultValue={tmpDebtBalance} id="debtBalance" name="debtBalance"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Frequency</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter frequency" defaultValue={tmpDebtFrequency} id="debtFrequency" name="debtFrequency"/>
                            </Form.Group>
                            <Form.Group controlId="due">
                                <Form.Label><b>Debt Due Date</b></Form.Label>
                                <DatePicker
                                    selected={dueDate}
                                    onChange={(date) => setDueDate(date)}
                                    name="due"
                                    wrapperClassName="my-datepicker"
                                    customInput={<Form.Control type="text" />}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><b>Debt Payment</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter payment" defaultValue={tmpDebtPayment} id="debtPayment" name="debtPayment"/>
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
