import {DateSelector} from "./DateSelector.tsx";

/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
const DateModal = () => {
    return (
        <div className="container">
            <header className="jumbotron">
                <h1 className="display-4">Date Modal</h1>
                <p>Testing Ground ...</p>
                <DateSelector />
            </header>
        </div>
    );
};

export default DateModal;
