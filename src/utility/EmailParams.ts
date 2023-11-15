import Params from "../types/params.type.ts";

export function getParams(recp: string, body: string, subject: string, src: string) {
    const params: Params = {
        Destination: { ToAddresses: [recp] },
        Message: {
            Body: { Text: { Data: body } },
        Subject: { Data: subject }
        },
        Source: src
    }
    return params;
}





