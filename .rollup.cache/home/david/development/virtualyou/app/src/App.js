import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Home from "./components/Home.tsx";
import Profile from "./components/Profile.tsx";
import BoardOwner from "./components/BoardOwner.tsx";
import BoardAgent from "./components/BoardAgent.tsx";
import BoardMonitor from "./components/BoardMonitor.tsx";
import BoardAdmin from "./components/BoardAdmin.tsx";
import EventBus from "./common/EventBus";
import RegisterAgent from "./components/RegisterAgent.tsx";
import RegisterMonitor from "./components/RegisterMonitor.tsx";
import TaskDetails from "./components/details/Task.tsx";
import PrescriptionDetails from "./components/details/Prescription.tsx";
import PeepDetails from "./components/details/Peep.tsx";
import AssetDetails from "./components/details/Asset.tsx";
import DebtDetails from "./components/details/Debt.tsx";
import TopFinancial from "./components/TopFinancial.tsx";
import TopMedical from "./components/TopMedical.tsx";
import TopLegal from "./components/TopLegal.tsx";
import TopAdministration from "./components/TopAdministration.tsx";
import TopPersonal from "./components/TopPersonal.tsx";
class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showOwnerBoard: false,
            showAgentBoard: false,
            showMonitorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }
    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                showOwnerBoard: user.roles.includes(("ROLE_OWNER")),
                showAgentBoard: user.roles.includes(("ROLE_AGENT")),
                showMonitorBoard: user.roles.includes(("ROLE_MONITOR")),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
        EventBus.on("logout", this.logOut);
    }
    componentWillUnmount() {
        EventBus.remove("logout", this.logOut);
    }
    logOut() {
        AuthService.logout();
        this.setState({
            showOwnerBoard: false,
            showAgentBoard: false,
            showMonitorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }
    render() {
        const { currentUser, showOwnerBoard, showAgentBoard, showMonitorBoard, showAdminBoard } = this.state;
        return (_jsxs("div", { children: [_jsxs("nav", { className: "navbar navbar-expand navbar-dark bg-dark", children: [_jsxs(Link, { to: "/", className: "navbar-brand", children: [_jsx("img", { src: "https://dlwhitehurst.com/vy.png", alt: "brand icon", width: "32", height: "32" }), " VirtualYou"] }), _jsxs("div", { className: "navbar-nav mr-auto", children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/home", className: "nav-link", children: "Home" }) }), showOwnerBoard && (_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/owner", className: "nav-link", children: "Dashboard" }) })), showAgentBoard && (_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/agent", className: "nav-link", children: "Dashboard" }) })), showMonitorBoard && (_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/monitor", className: "nav-link", children: "Dashboard" }) })), showAdminBoard && (_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/admin", className: "nav-link", children: "Dashboard" }) }))] }), currentUser ? (_jsxs("div", { className: "navbar-nav ml-auto", children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/profile", className: "nav-link", children: "Profile" }) }), _jsx("li", { className: "nav-item", children: _jsx("a", { href: "/login", className: "nav-link", onClick: this.logOut, children: "LogOut" }) })] })) : (_jsxs("div", { className: "navbar-nav ml-auto", children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/login", className: "nav-link", children: "Login" }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/register", className: "nav-link", children: "Register" }) })] }))] }), _jsx("div", { className: "container mt-3", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/owner", element: _jsx(BoardOwner, {}) }), _jsx(Route, { path: "/agent", element: _jsx(BoardAgent, {}) }), _jsx(Route, { path: "/monitor", element: _jsx(BoardMonitor, {}) }), _jsx(Route, { path: "/admin", element: _jsx(BoardAdmin, {}) }), _jsx(Route, { path: "/register-agent", element: _jsx(RegisterAgent, {}) }), _jsx(Route, { path: "/register-monitor", element: _jsx(RegisterMonitor, {}) }), _jsx(Route, { path: "/tasks", element: _jsx(TaskDetails, {}) }), _jsx(Route, { path: "/prescriptions", element: _jsx(PrescriptionDetails, {}) }), _jsx(Route, { path: "/peeps", element: _jsx(PeepDetails, {}) }), _jsx(Route, { path: "/assets", element: _jsx(AssetDetails, {}) }), _jsx(Route, { path: "/debts", element: _jsx(DebtDetails, {}) }), _jsx(Route, { path: "/financial", element: _jsx(TopFinancial, {}) }), _jsx(Route, { path: "/medical", element: _jsx(TopMedical, {}) }), _jsx(Route, { path: "/legal", element: _jsx(TopLegal, {}) }), _jsx(Route, { path: "/administration", element: _jsx(TopAdministration, {}) }), _jsx(Route, { path: "/personal", element: _jsx(TopPersonal, {}) })] }) })] }));
    }
}
export default App;
//# sourceMappingURL=App.js.map