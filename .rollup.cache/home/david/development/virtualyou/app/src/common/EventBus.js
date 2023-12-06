/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
const eventBus = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e));
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    },
};
export default eventBus;
//# sourceMappingURL=EventBus.js.map