import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import HcaptchaComponent from "./HcaptchaComponent.tsx";
import AuthService from "../services/auth.service";
export default class Register extends Component {
    constructor(props) {
        super(props);
        Object.defineProperty(this, "siteKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: import.meta.env.VITE_SITE_KEY
        });
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: "",
        };
    }
    validationSchema() {
        return Yup.object().shape({
            username: Yup.string()
                .test("len", "The username must be between 3 and 20 characters.", (val) => val &&
                val.toString().length >= 3 &&
                val.toString().length <= 20)
                .required("This field is required!"),
            email: Yup.string()
                .email("This is not a valid email.")
                .required("This field is required!"),
            password: Yup.string()
                .test("len", "The password must be between 6 and 40 characters.", (val) => val &&
                val.toString().length >= 6 &&
                val.toString().length <= 40)
                .required("This field is required!"),
        });
    }
    handleRegister(formValue) {
        const { username, email, password } = formValue;
        this.setState({
            message: "",
            successful: false
        });
        AuthService.register(username, email, password).then(response => {
            this.setState({
                message: response.data.message,
                successful: true
            });
        }, error => {
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            this.setState({
                successful: false,
                message: resMessage
            });
        });
    }
    render() {
        const { successful, message } = this.state;
        const initialValues = {
            username: "",
            email: "",
            password: "",
        };
        return (_jsx("div", { className: "col-md-12", children: _jsxs("div", { className: "card card-container", children: [_jsx("img", { src: "//ssl.gstatic.com/accounts/ui/avatar_2x.png", alt: "profile-img", className: "profile-img-card" }), _jsx(Formik, { initialValues: initialValues, validationSchema: this.validationSchema, onSubmit: this.handleRegister, children: _jsxs(Form, { children: [!successful && (_jsxs("div", { children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: " Username " }), _jsx(Field, { name: "username", type: "text", className: "form-control" }), _jsx(ErrorMessage, { name: "username", component: "div", className: "alert alert-danger" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: " Email " }), _jsx(Field, { name: "email", type: "email", className: "form-control" }), _jsx(ErrorMessage, { name: "email", component: "div", className: "alert alert-danger" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: " Password " }), _jsx(Field, { name: "password", type: "password", className: "form-control" }), _jsx(ErrorMessage, { name: "password", component: "div", className: "alert alert-danger" })] }), _jsx("div", { className: "form-group", children: _jsx("button", { type: "submit", className: "btn btn-primary btn-block", children: "Sign Up" }) }), _jsx("div", { children: _jsx(HcaptchaComponent, { sitekey: this.siteKey }) })] })), message && (_jsx("div", { className: "form-group", children: _jsx("div", { className: successful ? "alert alert-success" : "alert alert-danger", role: "alert", children: message }) }))] }) })] }) }));
    }
}
//# sourceMappingURL=Register.js.map