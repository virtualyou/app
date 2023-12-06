import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import { useLocation } from 'react-router-dom';
import { keysMatchForAgent } from "../utility/KeyValidator.ts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthService from "../services/auth.service.ts";
import { useState, useEffect } from "react";
import * as Yup from "yup";
const RegisterAgent = () => {
    const query = new URLSearchParams(useLocation().search);
    const dkey = query.get('dkey');
    const altId = query.get('ownerid');
    const [ownerId, setOwnerId] = useState(new URLSearchParams(useLocation().search).get('ownerid'));
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [decision, setDecision] = useState(null);
    useEffect(() => {
        keysMatchForAgent(parseInt(altId || "0"), dkey || "").then(setDecision);
    }, []);
    if (!ownerId) {
        setOwnerId("0");
    }
    const initialValues = {
        username: "",
        email: "",
        password: "",
        idOwner: ownerId
    };
    const validationSchema = () => {
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
    };
    const handleRegister = (formValue) => {
        const { username, email, password, idOwner } = formValue;
        setMessage("");
        setSuccessful(false);
        AuthService.registerHelper(username, email, password, parseInt(idOwner), "agent").then(response => {
            setMessage(response.data.message);
            setSuccessful(true);
        }, error => {
            const resMessage = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
            setSuccessful(false);
        });
    };
    if (decision === null) {
        return _jsx("div", { children: "Loading ..." });
    }
    if (decision) {
        return (_jsx("div", { className: "col-md-12", children: _jsxs("div", { className: "card card-container", children: [_jsx("img", { src: "//ssl.gstatic.com/accounts/ui/avatar_2x.png", alt: "profile-img", className: "profile-img-card" }), _jsx("h5", { children: "Agent Register" }), _jsx(Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleRegister, children: _jsxs(Form, { children: [!successful && (_jsxs("div", { children: [_jsxs("div", { className: "form-group", children: [_jsx(Field, { type: "hidden", name: "idOwner", className: "form-control" }), _jsx("label", { htmlFor: "username", children: " Username " }), _jsx(Field, { name: "username", type: "text", className: "form-control" }), _jsx(ErrorMessage, { name: "username", component: "div", className: "alert alert-danger" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "email", children: " Email " }), _jsx(Field, { name: "email", type: "email", className: "form-control" }), _jsx(ErrorMessage, { name: "email", component: "div", className: "alert alert-danger" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "password", children: " Password " }), _jsx(Field, { name: "password", type: "password", className: "form-control" }), _jsx(ErrorMessage, { name: "password", component: "div", className: "alert alert-danger" })] }), _jsx("div", { className: "form-group", children: _jsx("button", { type: "submit", className: "btn btn-primary btn-block", children: "Sign Up" }) })] })), message && (_jsx("div", { className: "form-group", children: _jsx("div", { className: successful ? "alert alert-success" : "alert alert-danger", role: "alert", children: message }) }))] }) })] }) }));
    }
    else {
        return (_jsx("div", { className: "col-md-12", children: _jsxs("div", { className: "card card-container", children: [_jsx("img", { src: "//ssl.gstatic.com/accounts/ui/avatar_2x.png", alt: "profile-img", className: "profile-img-card" }), _jsx("div", { className: "alert alert-warning", role: "alert", children: "You are not authorized to register as an Agent." })] }) }));
    }
};
export default RegisterAgent;
//# sourceMappingURL=RegisterAgent.js.map