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

//type Props = {};
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
                        <img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="32" height="32"/> VirtualYou
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
                                <Link to={"/register"} className="nav-link">
                                    Register
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/owner" element={<BoardOwner />} />
                        <Route path="/agent" element={<BoardAgent />} />
                        <Route path="/monitor" element={<BoardMonitor />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                        <Route path="/register-agent" element={<RegisterAgent />} />
                        <Route path="/register-monitor" element={<RegisterMonitor />} />
                    </Routes>
                </div>

                { /*<AuthVerify logOut={this.logOut}/> */}
            </div>
        );
    }
}

export default App;