/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import NameDisplay from "./display/NameDisplay.tsx";
import NameService from '../services/name.service';

const user = AuthService.getCurrentUser();

interface Owner {
    id: number;
    username: string;
    email: string,
    password: string,
    ownerId: string
}

const BoardAgent = () => {
    const [content, setContent] = useState("");
    const [owner, setOwner] = useState<Owner | null>(null);
    const [names, setNames] = useState([]);

    useEffect(() => {
        NameService.getNames()
            .then((response) => {
                setNames(response.data);
            })
    }, [])

    useEffect(() => {
        UserService.getOwner(1).then(
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
        UserService.getAgentBoard().then(
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

    if (!owner) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Agent Dashboard</h1>
                <p>{content} <b>{user.username}</b> is agent for:</p>
                <p>Owner: {owner.username} ({owner.id})</p>
                <h3 className="font-weight-light">Owner Contacts</h3>
                <NameDisplay data={names} />
            </header>
        </div>
    );
};

export default BoardAgent;
