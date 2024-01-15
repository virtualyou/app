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

Monitor.tsx - Registered Agent (component)
@author David L Whitehurst

*/

import { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

const Monitor = () => {
    const [monitorName, setMonitorName] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            const monitorId = user.monitorId;
            try {
                UserService.getUser(monitorId).then(response => {
                        setMonitorName(response.data.fullname);
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        console.error(resMessage);
                    }
                )
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('cannot obtain user from local storage!');
        }
    }, []);

    if (!monitorName) {
        return <div>Loading...</div>;
    }

    return (
        <div className="div-smaller1">
            <p><b>Registered Monitor:</b> {monitorName}</p>
        </div>
    );
};

export default Monitor;
