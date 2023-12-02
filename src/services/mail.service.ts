/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import { SES } from "@aws-sdk/client-ses";

import { getParams } from "../utility/EmailParams.ts";
import { getAgentBody, getMonitorBody } from "../utility/EmailBody.ts"
import FormValues from "../types/formvalues.type.ts";

const AWS = require('aws-sdk');


class MailService {

    private ses = new AWS.SES({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: new AWS.Credentials({
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        }),
    });

    // AWS SES Client
    /*
    private ses = new SES({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        }
    });
    */

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