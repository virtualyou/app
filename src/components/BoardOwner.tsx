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

BoardOwner.tsx - Owner dashboard page (component)
@author David L Whitehurst

*/

import { useState, useEffect } from "react";

import InfoAlert from "./notification/InfoAlert.tsx";
import PeepDisplay from "./display/PeepDisplay.tsx";
import PersonalService from '../services/personal.service.ts';
import MedicalService from "../services/medical.service.ts";
import AuthService from "../services/auth.service";
import FinancialService from "../services/financial.service.ts";
import AdministrationService from "../services/administration.service.ts";
import LegalService from "../services/legal.service.ts";

import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import TaskDisplay from "./display/TaskDisplay.tsx";
import DocDisplay from "./display/DocDisplay.tsx";

const user = AuthService.getCurrentUser();

const BoardOwner = () => {
    const [peeps, setPeeps] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        LegalService.getDocs()
            .then((response) => {
                setDocs(response.data);
            })
    }, [])

    useEffect(() => {
        AdministrationService.getTasks()
            .then((response) => {
                setTasks(response.data);
            })
    }, [])

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

    useEffect(() => {
        PersonalService.getPeeps()
            .then((response) => {
                setPeeps(response.data);
            })
    }, [])

    useEffect(() => {
        MedicalService.getPrescriptions()
            .then((response) => {
                setPrescriptions(response.data);
            })
    }, [])

    if (!tasks || !peeps || !prescriptions || !assets || !debts || !docs) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Owner Dashboard</h1>
                <p>Owner: <b>{user.fullname}</b></p>
                <p className="lead">This dashboard provides notifications and key data on a single landing page.</p>
                <InfoAlert note={"Hello Mom, from your favorite Agent, David L Whitehurst"} />
                <h3 className="font-weight-light">Tasks</h3>
                <TaskDisplay data={tasks} />
                <h3 className="font-weight-light">Key Contacts</h3>
                <PeepDisplay data={peeps} />
                <h3 className="font-weight-light">Prescriptions</h3>
                <PrescriptionDisplay data={prescriptions} />
                <h3 className="font-weight-light">Assets</h3>
                <AssetDisplay data={assets} />
                <h3 className="font-weight-light">Debts</h3>
                <DebtDisplay data={debts} />
                <h3 className="font-weight-light">Docs</h3>
                <DocDisplay data={docs} />

            </header>
            <p></p>
            <p></p>
            <footer className="container">
                <p><img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="24"
                        height="24"/> &copy; VirtualYou and David L Whitehurst 2023</p>
            </footer>
        </div>
    );
};

export default BoardOwner;
