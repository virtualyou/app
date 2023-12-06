/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import User from './types/user.type';
interface Props {
}
type State = {
    showOwnerBoard: boolean;
    showAgentBoard: boolean;
    showMonitorBoard: boolean;
    showAdminBoard: boolean;
    currentUser: User | undefined;
};
declare class App extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    logOut(): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default App;
