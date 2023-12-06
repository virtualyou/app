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

BoardAgent.tsx - Agent dashboard page (component)
@author David L Whitehurst

*/

import { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import PeepDisplay from "./display/PeepDisplay.tsx";
import PersonalService from '../services/personal.service.ts';
import AdministrationService from "../services/administration.service.ts";
import FinancialService from "../services/financial.service.ts";
import MedicalService from "../services/medical.service.ts";
import InfoAlert from "./notification/InfoAlert.tsx";
import TaskDisplay from "./display/TaskDisplay.tsx";
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import User from "../types/user.type.ts";

const BoardAgent = () => {
    const [content, setContent] = useState("");
    const [peeps, setPeeps] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [owner, setOwner] = useState<User>();

    useEffect(() => {
        const ownerid = localStorage.getItem("ownerid") || "0";
        UserService.getOwner(parseInt(ownerid)).then(
            (response) => {
                setOwner(response.data);
            },
            (error) => {
                const _owner =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setOwner(_owner);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

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
        UserService.getAgentBoard().then(
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

    if (!content || !tasks || !peeps || !prescriptions || !assets || !debts || !owner) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Agent Dashboard</h1>
                <p className="red-bold">WARNING: This data is owned by {owner.username}. You are responsible for the
                    integrity of someone else's data.</p>
                <InfoAlert note={"Don't forget to validate medications."} />
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

export default BoardAgent;
