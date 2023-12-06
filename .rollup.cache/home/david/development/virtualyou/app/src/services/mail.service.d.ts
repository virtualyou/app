/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import FormValues from "../types/formvalues.type.ts";
declare class MailService {
    private ses;
    emailAgent(formData: FormValues): void;
    emailMonitor(formData: FormValues): void;
}
declare const _default: MailService;
export default _default;
