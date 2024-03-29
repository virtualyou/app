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
import TaskDisplay from "./display/TaskDisplay.tsx";
import User from "../types/user.type.ts";
import NeedDisplay from "./display/NeedDisplay.tsx";

const BoardAgent = () => {
    const [peeps, setPeeps] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [owner, setOwner] = useState<User>();

    useEffect(() => {
        const ownerid = localStorage.getItem("ownerid") as string;
        console.log("owner id is: " + ownerid);
        UserService.getUser(parseInt(ownerid)).then(
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
        AdministrationService.getNeeds()
            .then((response) => {
                setNeeds(response.data);
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

    if (!tasks || !peeps || !prescriptions || !assets || !debts || !owner) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Agent Dashboard</h1>
                <p className="red-bold">WARNING: This data is owned by {owner.fullname}. You are responsible for the
                    integrity of this data.</p>
                <p className="lead">Tip: Keep lists short, maintained, and important.</p>
                {/* <InfoAlert note={"Hello Mom, from your favorite Agent, David L Whitehurst"}/> */}
                {/* new */}
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a className="nav-link" href="#administration">Admin</a></li>
                    <li className="nav-item"><a className="nav-link" href="#financial">Financial</a></li>
                    <li className="nav-item"><a className="nav-link" href="#medical">Medical</a></li>
                    <li className="nav-item"><a className="nav-link" href="#legal">Legal</a></li>
                    <li className="nav-item"><a className="nav-link" href="#personal">Personal</a></li>
                    <li className="nav-item"><a className="nav-link disabled" href="">Settings</a>
                    </li>
                </ul>
                <div className="div-spctopbot1"></div>
                {/* new end */}
                <h3 className="font-weight-light">Tasks</h3>
                <TaskDisplay data={tasks}/>
                <h3 className="font-weight-light">Needs</h3>
                <NeedDisplay data={needs}/>
                <h3 className="font-weight-light">Contacts</h3>
                <PeepDisplay data={peeps}/>
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

export default BoardAgent;
