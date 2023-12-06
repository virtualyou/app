/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { Component } from "react";
import * as Yup from "yup";
interface Props {
}
type State = {
    redirect: string | null;
    username: string;
    password: string;
    loading: boolean;
    message: string;
};
export default class Login extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    validationSchema(): Yup.ObjectSchema<{
        username: string;
        password: string;
    }, Yup.AnyObject, {
        username: undefined;
        password: undefined;
    }, "">;
    handleLogin(formValue: {
        username: string;
        password: string;
    }): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
