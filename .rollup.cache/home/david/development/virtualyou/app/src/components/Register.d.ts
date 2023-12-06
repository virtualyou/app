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
    username: string;
    email: string;
    password: string;
    successful: boolean;
    message: string;
};
export default class Register extends Component<Props, State> {
    constructor(props: Props);
    private siteKey;
    validationSchema(): Yup.ObjectSchema<{
        username: string;
        email: string;
        password: string;
    }, Yup.AnyObject, {
        username: undefined;
        email: undefined;
        password: undefined;
    }, "">;
    handleRegister(formValue: {
        username: string;
        email: string;
        password: string;
    }): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
