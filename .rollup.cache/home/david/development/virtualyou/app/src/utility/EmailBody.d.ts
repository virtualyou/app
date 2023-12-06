/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
/**
 * This is a function that prepares an AWS SES Agent invitation email body.
 *
 * @param {string} name - The person the email is addressing.
 * @returns {string} The text email body.
 */
export declare function getAgentBody(name: string): string;
/**
 * This is a function that prepares an AWS SES Monitor invitation email body.
 *
 * @param {string} name - The person the email is addressing.
 * @returns {string} The text email body.
 */
export declare function getMonitorBody(name: string): string;
