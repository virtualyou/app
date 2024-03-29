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

App.tsx - React App Component
@author David L Whitehurst

*/
import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import User from './types/user.type';

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
import Pricing from "./components/Pricing.tsx";
import NeedDetails from "./components/details/Need.tsx";
import RecoverUser from "./components/RecoverUser.tsx";
import RenewPassword from "./components/RenewPassword.tsx";
import UpdatePassword from "./components/UpdatePassword.tsx";

interface Props {
    // Define the props that your component expects
}

type State = {
    showOwnerBoard: boolean,
    showAgentBoard: boolean,
    showMonitorBoard: boolean,
    showAdminBoard: boolean,
    currentUser: User | undefined
}

class App extends Component<Props, State> {
    constructor(props: Props) {
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

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        <img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="32" height="32"/> VirtualYouPlan
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showOwnerBoard && (
                            <li className="nav-item">
                                <Link to={"/owner"} className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {showAgentBoard && (
                            <li className="nav-item">
                                <Link to={"/agent"} className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {showMonitorBoard && (
                            <li className="nav-item">
                                <Link to={"/monitor"} className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {/*
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/owner"} className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        */}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {/* currentUser.username */}
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/pricing"} className="nav-link">
                                    Pricing
                                </Link>
                            </li>
                            {/*
                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Register
                                </Link>
                            </li>
                            */}
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/owner" element={<BoardOwner />} />
                        <Route path="/agent" element={<BoardAgent />} />
                        <Route path="/monitor" element={<BoardMonitor />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                        <Route path="/register-agent" element={<RegisterAgent />} />
                        <Route path="/register-monitor" element={<RegisterMonitor />} />
                        <Route path="/tasks" element={<TaskDetails />} />
                        <Route path="/needs" element={<NeedDetails />} />
                        <Route path="/prescriptions" element={<PrescriptionDetails />} />
                        <Route path="/peeps" element={<PeepDetails />} />
                        <Route path="/assets" element={<AssetDetails />} />
                        <Route path="/debts" element={<DebtDetails />} />
                        <Route path="/financial" element={<TopFinancial />} />
                        <Route path="/medical" element={<TopMedical />} />
                        <Route path="/legal" element={<TopLegal />} />
                        <Route path="/administration" element={<TopAdministration />} />
                        <Route path="/personal" element={<TopPersonal />} />

                        {/* current work */}
                        <Route path="/recoveruser" element={<RecoverUser />} />
                        <Route path="/renewpassword" element={<RenewPassword />} />
                        <Route path="/update-password" element={<UpdatePassword />} />

                    </Routes>
                </div>

                { /*<AuthVerify logOut={this.logOut}/> */}
            </div>
        );
    }
}

export default App;

