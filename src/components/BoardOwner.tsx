/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import InfoAlert from "./notification/InfoAlert.tsx";
import PeepDisplay from "./display/PeepDisplay.tsx";
import PersonalService from '../services/personal.service.ts';
import MedicalService from "../services/medical.service.ts";
import AuthService from "../services/auth.service";
import FinancialService from "../services/financial.service.ts";
import AdministrationService from "../services/administration.service.ts";
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import TaskDisplay from "./display/TaskDisplay.tsx";

const user = AuthService.getCurrentUser();

const BoardOwner = () => {
    const [content, setContent] = useState("");
    const [peeps, setPeeps] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [tasks, setTasks] = useState([]);

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

    useEffect(() => {
        UserService.getOwnerBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    if (!content || !tasks || !peeps || !prescriptions || !assets || !debts) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Owner Dashboard</h1>
                <p>{content} <b>{user.username}</b></p>
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

            </header>
        </div>
    );
};

export default BoardOwner;
