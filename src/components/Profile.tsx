/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import AuthService from "../services/auth.service";
import './custom.css';
import {Link} from "react-router-dom";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
                <div className="comp-div">
                <p>
                    <strong>Id:</strong> {currentUser.id}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
                </ul>
                </div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h5>Let's Get Started</h5>
                <p>
                    Links are provided here to get started building your digital self and keeping your vital
                    information in one place and up to date. The Dashboard is used to show on-going activity
                    and also reminders for things that need attention.
                </p>
                <ul>
                    <li><Link to={`/financial`}>Financial</Link></li>
                    <li><Link to={`/medical`}>Medical</Link></li>
                    <li><Link to={`/legal`}>Legal</Link></li>
                    <li><Link to={`/administration`}>Administration</Link></li>
                    <li><Link to={`/personal`}>Personal</Link></li>
                </ul>
            </header>
        </div>
    );
};

export default Profile;
