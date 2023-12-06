/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
export default interface Prescription {
    id: number;
    name: string;
    identNo: string;
    size: string;
    form: string;
    rxUnit: string;
    quantity: string;
    pharmacy: string;
    pharmacyPhone: string;
    written: string;
    writtenBy: string;
    filled: string;
    expired: string;
    refillNote: string;
    manufacturedBy: string;
    note: string;
    userKey: number;
}
