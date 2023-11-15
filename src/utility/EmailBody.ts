import AuthService from "../services/auth.service.ts";
import forge from "node-forge";

export function getAgentBody(name: string) {
    const currentUser = AuthService.getCurrentUser();
    const id = currentUser.id;
    const agentMne = currentUser.agentMnemonic;
    const myName = currentUser.username;
    const md = forge.md.sha256.create();
    md.update(agentMne);
    const dkey = md.digest().toHex();
    const retLink = "http://localhost:3000/register-agent?ownerid=" + id + "&dkey=" + dkey;

    return name + ",\n\nYou have been invited to be an Agent for " + myName + ". Use this link to register and begin helping " + myName + ".\n\n" + retLink;
}

export function getMonitorBody(name: string) {
    const currentUser = AuthService.getCurrentUser();
    const id = currentUser.id;
    const monitorMne = currentUser.monitorMnemonic;
    const myName = currentUser.username;
    const md = forge.md.sha256.create();
    md.update(monitorMne);
    const dkey = md.digest().toHex();
    const retLink = "http://localhost:3000/register-monitor?ownerid=" + id + "&dkey=" + dkey;

    return name + ",\n\nYou have been invited to be a Monitor for " + myName + ". Use this link to register and begin helping " + myName + ".\n\n" + retLink;
}
