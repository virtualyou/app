import { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardAgent = () => {
    const [content, setContent] = useState("");

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

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
                <p>&nbsp;</p>
                <h5>Agent Board</h5>
                <p>&nbsp;</p>
                <p>
                    You have been designated to the be the Agent for a VirtualYou Owner. You have read/write access
                    to the Owner's account here. You have a responsibility to treat their data/information with the
                    same respect you would treat your own. You have taken leadership to assist the Owner with their
                    affairs. Remember this stewardship is granted to you and it can be taken away if abused.
                </p>
            </header>
        </div>
    );
};

export default BoardAgent;
