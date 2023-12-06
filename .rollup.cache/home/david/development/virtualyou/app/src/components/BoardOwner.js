import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        });
    }, []);
    useEffect(() => {
        FinancialService.getAssets()
            .then((response) => {
            setAssets(response.data);
        });
    }, []);
    useEffect(() => {
        FinancialService.getDebts()
            .then((response) => {
            setDebts(response.data);
        });
    }, []);
    useEffect(() => {
        PersonalService.getPeeps()
            .then((response) => {
            setPeeps(response.data);
        });
    }, []);
    useEffect(() => {
        MedicalService.getPrescriptions()
            .then((response) => {
            setPrescriptions(response.data);
        });
    }, []);
    useEffect(() => {
        UserService.getOwnerBoard().then((response) => {
            setContent(response.data);
        }, (error) => {
            const _content = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            setContent(_content);
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        });
    }, []);
    if (!content || !tasks || !peeps || !prescriptions || !assets || !debts) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Owner Dashboard" }), _jsxs("p", { children: [content, " ", _jsx("b", { children: user.username })] }), _jsx("p", { className: "lead", children: "This dashboard provides notifications and key data on a single landing page." }), _jsx(InfoAlert, { note: "Hello Mom, from your favorite Agent, David L Whitehurst" }), _jsx("h3", { className: "font-weight-light", children: "Tasks" }), _jsx(TaskDisplay, { data: tasks }), _jsx("h3", { className: "font-weight-light", children: "Key Contacts" }), _jsx(PeepDisplay, { data: peeps }), _jsx("h3", { className: "font-weight-light", children: "Prescriptions" }), _jsx(PrescriptionDisplay, { data: prescriptions }), _jsx("h3", { className: "font-weight-light", children: "Assets" }), _jsx(AssetDisplay, { data: assets }), _jsx("h3", { className: "font-weight-light", children: "Debts" }), _jsx(DebtDisplay, { data: debts })] }) }));
};
export default BoardOwner;
//# sourceMappingURL=BoardOwner.js.map