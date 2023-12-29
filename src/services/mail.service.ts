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

mail.service.ts - AWS SES email service
@author David L Whitehurst

*/

import InviteFormValues from "../types/formvalues.type";
import axios from "axios";
import authHeader from "./auth-header.ts";
import { getCurrentUser, getAgentReturnLink, getMonitorReturnLink} from "../utility/email.utils.ts";

const NOTIFICATION_URL = import.meta.env.VITE_APP_BASEPATH + "/notification/v1/owner/";
class MailService {

    // Send Agent Invitation Email
    emailAgent(formData: InviteFormValues) {
        const owner = getCurrentUser().fullname;
        const name = formData.name;
        const email = formData.email;
        const returnLink = getAgentReturnLink();
        // axios POST to API
        return axios.post(NOTIFICATION_URL + "agent-invite", {
            name,
            email,
            owner,
            returnLink
        }, { headers: authHeader() })
            .then(response => {
            if (response.data) {
                console.log(response.data);
            }
        });
    }

    // Send Monitor Invitation Email
    emailMonitor(formData: InviteFormValues) {
        const owner = getCurrentUser().fullname;
        const name = formData.name;
        const email = formData.email;
        const returnLink = getMonitorReturnLink();
        // axios POST to API
        return axios.post(NOTIFICATION_URL + "monitor-invite", {
            name,
            email,
            owner,
            returnLink
        }, { headers: authHeader() })
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                }
            });
    }
}

export default new MailService();