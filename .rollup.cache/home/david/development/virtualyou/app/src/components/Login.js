import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            redirect: null,
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            this.setState({ redirect: "/profile" });
        }
    }
    componentWillUnmount() {
        window.location.reload();
    }
    validationSchema() {
        return Yup.object().shape({
            username: Yup.string().required("This field is required!"),
            password: Yup.string().required("This field is required!"),
        });
    }
    handleLogin(formValue) {
        const { username, password } = formValue;
        this.setState({
            message: "",
            loading: true
        });
        AuthService.login(username, password).then(() => {
            this.setState({
                redirect: "/profile"
            });
        }, error => {
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            this.setState({
                loading: false,
                message: resMessage
            });
        });
    }
    render() {
        if (this.state.redirect) {
            return _jsx(Navigate, { to: this.state.redirect });
        }
        const { loading, message } = this.state;
        const initialValues = {
            username: "",
            password: "",
        };
        return (_jsx("div", { className: "col-md-12", children: _jsxs("div", { className: "card card-container", children: [_jsx("img", { src: "//ssl.gstatic.com/accounts/ui/avatar_2x.png", alt: "profile-img", className: "profile-img-card" }), _jsx(Formik, { initialValues: initialValues, validationSchema: this.validationSchema, onSubmit: this.handleLogin, children: _jsxs(Form, { children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx(Field, { name: "username", type: "text", className: "form-control" }), _jsx(ErrorMessage, { name: "username", component: "div", className: "alert alert-danger" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx(Field, { name: "password", type: "password", className: "form-control" }), _jsx(ErrorMessage, { name: "password", component: "div", className: "alert alert-danger" })] }), _jsx("div", { className: "form-group", children: _jsxs("button", { type: "submit", className: "btn btn-primary btn-block", disabled: loading, children: [loading && (_jsx("span", { className: "spinner-border spinner-border-sm" })), _jsx("span", { children: "Login" })] }) }), message && (_jsx("div", { className: "form-group", children: _jsx("div", { className: "alert alert-danger", role: "alert", children: message }) }))] }) })] }) }));
    }
}
//# sourceMappingURL=Login.js.map