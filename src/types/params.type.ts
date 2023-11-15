export default interface Params {
    Destination: {
        ToAddresses: string[];
    },
    Message: {
        Body: {
            Text: {
                Data: string
            },
        },
        Subject: {
            Data: string
        },
    },
    Source: string,
}
