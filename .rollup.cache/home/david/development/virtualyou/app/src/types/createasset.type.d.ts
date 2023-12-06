/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
export default interface CreateAsset {
    name: string;
    assetType: string;
    accountNo: string;
    website: string;
    websiteUser: string;
    websitePassword: string;
    holdingCompany: string;
    holdingCompanyAddress: string;
    holdingCompanyPhone: string;
    balance: string;
    userKey: number;
}
