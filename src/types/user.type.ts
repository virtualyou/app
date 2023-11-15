export default interface User {
    id: number,
    username: string | null,
    email: string,
    password: string,
    roles: Array<string>,
    ownerId: number,
    agentMnemonic: string,
    monitorMnemonic: string
}
