/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
declare const eventBus: {
    on(event: string, callback: EventListener): void;
    dispatch(event: string, data?: any): void;
    remove(event: string, callback: EventListener): void;
};
export default eventBus;
