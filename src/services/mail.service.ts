import { SES } from "@aws-sdk/client-ses";

class MailService {

    // AWS SES Client
    private ses = new SES({
        region: import.meta.env.VITE_AWS_REGION,
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
        }
    });

    // Basic Static Email
    private agentParams = {
        Destination: {
            ToAddresses: ['dlwhitehurst@gmail.com'],
        },
        Message: {
            Body: {
                Text: {
                    Data: 'You have been invited to be an Agent for Bob Smith on VirtualYou.',
                },
            },
            Subject: {
                Data: 'VirtualYou Agent Invitation',
            },
        },
        Source: 'me@dlwhitehurst.com',
    };

    private monitorParams = {
        Destination: {
            ToAddresses: ['dlwhitehurst@gmail.com'],
        },
        Message: {
            Body: {
                Text: {
                    Data: 'You have been invited to be a Monitor for Bob Smith on VirtualYou.',
                },
            },
            Subject: {
                Data: 'VirtualYou Monitor Invitation',
            },
        },
        Source: 'me@dlwhitehurst.com',
    };

    emailAgent() {
        this.ses.sendEmail(this.agentParams, (err: any, data: any) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }

    emailMonitor() {
        this.ses.sendEmail(this.monitorParams, (err: any, data: any) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }

}

export default new MailService();