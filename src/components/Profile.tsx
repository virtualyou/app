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

Profile.tsx - Profile (component)
@author David L Whitehurst

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
