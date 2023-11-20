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
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";

const user = AuthService.getCurrentUser();

const BoardOwner = () => {
    const [content, setContent] = useState("");
    const [peeps, setPeeps] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

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

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Owner Dashboard</h1>
                <p>{content} <b>{user.username}</b></p>
                <p className="lead">This dashboard provides notifications and key data on a single landing page.</p>
                <InfoAlert note={"Hello Mom, from your favorite Agent, David L Whitehurst"} />
                <h3 className="font-weight-light">Key Contacts</h3>
                <PeepDisplay data={peeps} />
                <h3 className="font-weight-light">Prescriptions</h3>
                <PrescriptionDisplay data={prescriptions} />
            </header>
        </div>
    );
};

export default BoardOwner;
