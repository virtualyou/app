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

import { SES } from "@aws-sdk/client-ses";

import { getParams } from "../utility/EmailParams.ts";
import { getAgentBody, getMonitorBody } from "../utility/EmailBody.ts"
import FormValues from "../types/formvalues.type.ts";

class MailService {

    // AWS SES Client
    private ses = new SES({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        }
    });

    // Send Agent Invitation Email
    emailAgent(formData: FormValues) {
        console.log(formData.email);
        const params= getParams(formData.email, getAgentBody(formData.name), "VirtualYou Agent Invitation", "me@dlwhitehurst.com");
        this.ses.sendEmail(params, (err: any, data: any) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }

    // Send Monitor Invitation Email
    emailMonitor(formData: FormValues) {
        console.log(formData.email);
        const params= getParams(formData.email, getMonitorBody(formData.name), "VirtualYou Monitor Invitation", "me@dlwhitehurst.com");
        this.ses.sendEmail(params, (err: any, data: any) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }
}

export default new MailService();