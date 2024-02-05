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

email.utils.ts - Function exports for Agent and Monitor email bodies
@author David L Whitehurst

*/

import AuthService from "../services/auth.service.ts";
import forge from "node-forge";

const BASEPATH = import.meta.env.VITE_APP_BASEPATH;

export function getCurrentUser() {
    return AuthService.getCurrentUser();
}

export function getOwnerName() {
    return "TODO: Implement this";
}

export function getPasswordRenewReturnLink(id: number) {
    let dkey = '';
    if (id > 0) {
        const agentMne = "renew gift cigar foster dad plate idle nerve hungry human moral faith";
        const md = forge.md.sha256.create();
        md.update(agentMne);
        dkey = md.digest().toHex();
        const currentDate = new Date();
        const integerCurrent = Date.parse(currentDate.toString());
        const integerPlusTen = integerCurrent + 600000; // add 10 minutes
        return BASEPATH + "#/update-password?id=" + id + "&dkey=" + dkey + "&expire=" + integerPlusTen;
    } else {
        return "ERROR: bad link ... inform VirtualYou Administrator at me@dlwhitehurst.com";
    }
}

export function isNotExpired(expiry: number) {
    const currentDate = new Date();
    const now = Date.parse(currentDate.toString());
    console.log("expiry:" + expiry);
    console.log("now:" + now);
    let retVal = false;
    if (expiry > now) {
        retVal = true;
    }
    return retVal;
}

export function getAgentReturnLink() {
    let dkey = '';
    let id = getCurrentUser().id;
    if (id > 0) {
        const agentMne = getCurrentUser().agentMnemonic;
        const md = forge.md.sha256.create();
        md.update(agentMne);
        dkey = md.digest().toHex();
        return BASEPATH + "#/register-agent?ownerid=" + id + "&dkey=" + dkey;
    } else {
        return "ERROR: broken link ... inform VirtualYou Administrator at me@dlwhitehurst.com";
    }
}

export function getMonitorReturnLink() {
    let dkey = '';
    let id = getCurrentUser().id;
    if (id > 0) {
        const monitorMne = getCurrentUser().monitorMnemonic;
        const md = forge.md.sha256.create();
        md.update(monitorMne);
        dkey = md.digest().toHex();
        return BASEPATH + "#/register-monitor?ownerid=" + id + "&dkey=" + dkey;
    } else {
        return "ERROR: broken link ... inform VirtualYou Administrator at me@dlwhitehurst.com";
    }
}

