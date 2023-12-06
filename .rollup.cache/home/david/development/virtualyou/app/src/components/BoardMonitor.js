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
import TaskDisplay from "./display/TaskDisplay.tsx";
import PeepDisplay from "./display/PeepDisplay.tsx";
import PrescriptionDisplay from "./display/PrescriptionDisplay.tsx";
import AssetDisplay from "./display/AssetDisplay.tsx";
import DebtDisplay from "./display/DebtDisplay.tsx";
import AdministrationService from "../services/administration.service.ts";
import FinancialService from "../services/financial.service.ts";
import PersonalService from "../services/personal.service.ts";
import MedicalService from "../services/medical.service.ts";
const BoardMonitor = () => {
    const [content, setContent] = useState("");
    const [peeps, setPeeps] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);
    const [assets, setAssets] = useState([]);
    const [debts, setDebts] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [owner, setOwner] = useState();
    useEffect(() => {
        const ownerid = localStorage.getItem("ownerid") || "0";
        UserService.getOwner(parseInt(ownerid)).then((response) => {
            setOwner(response.data);
        }, (error) => {
            const _owner = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            setOwner(_owner);
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
        });
    }, []);
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
        UserService.getAgentBoard().then((response) => {
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
    if (!content || !tasks || !peeps || !prescriptions || !assets || !debts || !owner) {
        return _jsx("div", { children: "Loading..." });
    }
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsx("h1", { className: "display-4", children: "Monitor Dashboard" }), _jsxs("p", { className: "red-bold", children: ["WARNING: This data is owned by ", owner.username, ". You cannot change it however, you are still responsible for the integrity of someone else's data."] }), _jsx(InfoAlert, { note: "Don't forget to validate medications." }), _jsx("h3", { className: "font-weight-light", children: "Tasks" }), _jsx(TaskDisplay, { data: tasks }), _jsx("h3", { className: "font-weight-light", children: "Key Contacts" }), _jsx(PeepDisplay, { data: peeps }), _jsx("h3", { className: "font-weight-light", children: "Prescriptions" }), _jsx(PrescriptionDisplay, { data: prescriptions }), _jsx("h3", { className: "font-weight-light", children: "Assets" }), _jsx(AssetDisplay, { data: assets }), _jsx("h3", { className: "font-weight-light", children: "Debts" }), _jsx(DebtDisplay, { data: debts })] }) }));
};
export default BoardMonitor;
//# sourceMappingURL=BoardMonitor.js.map