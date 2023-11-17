/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
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
    return await UserService.getOwner(id)
        .then((result) => {
            const md = forge.md.sha256.create();
            md.update(result.data.agentMnemonic);
            const originalKey = md.digest().toHex();
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
    return await UserService.getOwner(id)
        .then((result) => {
            const md = forge.md.sha256.create();
            md.update(result.data.monitorMnemonic);
            const originalKey = md.digest().toHex();
            return originalKey === key;
        })
        .catch((error) => {
            console.error(error);
            return false;
        });
}


