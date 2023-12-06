/**
 * This asynchronous function compares an owner's agent key with
 * a query parameter key in an Agent invite.
 *
 * @param {number} id - The owner's user id.
 * @param {string} key - The key as the query parameter.
 * @returns {Promise<boolean>} - The keys match?
 */
export declare function keysMatchForAgent(id: number, key: string): Promise<boolean>;
/**
 * This asynchronous function compares an owner's monitor key with
 * a query parameter key in a Monitor invite.
 *
 * @param {number} id - The owner's user id.
 * @param {string} key - The key as the query parameter.
 * @returns {Promise<boolean>} - The keys match?
 */
export declare function keysMatchForMonitor(id: number, key: string): Promise<boolean>;
