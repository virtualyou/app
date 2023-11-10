import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import InfoAlert from "./notification/InfoAlert.tsx";
import NameDisplay from "./display/NameDisplay.tsx";
import NameService from '../services/name.service';
import AuthService from "../services/auth.service";
const user = AuthService.getCurrentUser();

const BoardOwner = () => {
    const [content, setContent] = useState("");
    const [names, setNames] = useState([]);

    useEffect(() => {
        NameService.getNames()
            .then((response) => {
                setNames(response.data);
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
                <NameDisplay data={names} />
            </header>
        </div>
    );
};

export default BoardOwner;
