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

EmailBody.ts - Function exports for Agent and Monitor email bodies
@author David L Whitehurst

*/

import AuthService from "../services/auth.service.ts";
import forge from "node-forge";

/**
 * This is a function that prepares an AWS SES Agent invitation email body.
 *
 * @param {string} name - The person the email is addressing.
 * @returns {string} The text email body.
 */
export function getAgentBody(name: string) {
    const currentUser = AuthService.getCurrentUser();
    const id = currentUser.id;
    const agentMne = currentUser.agentMnemonic;
    const myName = currentUser.username;
    const md = forge.md.sha256.create();
    md.update(agentMne);
    const dkey = md.digest().toHex();
    const retLink = "https://app.virtualyou.info" + "/register-agent?ownerid=" + id + "&dkey=" + dkey;

    return name + ",\n\nYou have been invited to be an Agent for " + myName + ". Use this link to register and begin helping " + myName + ".\n\n" + retLink;
}

/**
 * This is a function that prepares an AWS SES Monitor invitation email body.
 *
 * @param {string} name - The person the email is addressing.
 * @returns {string} The text email body.
 */
export function getMonitorBody(name: string) {
    const currentUser = AuthService.getCurrentUser();
    const id = currentUser.id;
    const monitorMne = currentUser.monitorMnemonic;
    const myName = currentUser.username;
    const md = forge.md.sha256.create();
    md.update(monitorMne);
    const dkey = md.digest().toHex();
    const retLink = "https://app.virtualyou.info" + "/register-monitor?ownerid=" + id + "&dkey=" + dkey;

    return name + ",\n\nYou have been invited to be a Monitor for " + myName + ". Use this link to register and begin helping " + myName + ".\n\n" + retLink;
}
