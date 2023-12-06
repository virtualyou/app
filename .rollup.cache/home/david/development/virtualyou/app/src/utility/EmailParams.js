/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
export function getParams(recp, body, subject, src) {
    const params = {
        Destination: { ToAddresses: [recp] },
        Message: {
            Body: { Text: { Data: body } },
            Subject: { Data: subject }
        },
        Source: src
    };
    return params;
}
//# sourceMappingURL=EmailParams.js.map