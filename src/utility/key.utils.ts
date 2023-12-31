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

key.utils.ts - Functions for matching Agent and Monitor deterministic keys
@author David L Whitehurst

*/

import UserService from "../services/user.service.ts";
import forge from "node-forge";

/**
 * This asynchronous function compares an owner's agent key with
 * a query parameter key in an Agent invite.
 *
 * @param {number} id - The owner's user id.
 * @param {string} key - The key as the query parameter.
 * @returns {Promise<boolean>} - The keys match?
 */
export async function keysMatchForAgent(id: number, key: string): Promise<boolean> {
    return await UserService.getUser(id)
        .then((result) => {
            const md = forge.md.sha256.create();
            md.update(result.data.agentMnemonic);
            const originalKey = md.digest().toHex();
            console.log(originalKey);
            return originalKey === key;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
}

/**
 * This asynchronous function compares an owner's monitor key with
 * a query parameter key in a Monitor invite.
 *
 * @param {number} id - The owner's user id.
 * @param {string} key - The key as the query parameter.
 * @returns {Promise<boolean>} - The keys match?
 */
export async function keysMatchForMonitor(id: number, key: string): Promise<boolean> {
    return await UserService.getUser(id)
        .then((result) => {
            const md = forge.md.sha256.create();
            md.update(result.data.monitorMnemonic);
            const originalKey = md.digest().toHex();
            console.log(originalKey);
            return originalKey === key;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
}


