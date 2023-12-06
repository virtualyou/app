/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
export default interface CreateDebt {
    name: string;
    debtType: string;
    accountNo: string;
    website: string;
    websiteUser: string;
    websitePassword: string;
    holdingCompany: string;
    holdingCompanyAddress: string;
    holdingCompanyPhone: string;
    balance: string;
    frequency: string;
    due: string;
    payment: string;
    userKey: number;
}
