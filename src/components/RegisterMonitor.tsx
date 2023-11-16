/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import { useLocation } from 'react-router-dom';
import {keysMatch} from "../utility/KeyValidator.ts";
import {ErrorMessage, Field, Form, Formik} from "formik";
import AuthService from "../services/auth.service.ts";
import { useState } from "react";
import * as Yup from "yup";

const RegisterMonitor = () => {
    const query = new URLSearchParams(useLocation().search);
    const dkey = query.get('dkey');
    const [ownerId, setOwnerId] = useState(new URLSearchParams(useLocation().search).get('ownerid'));
    //const id = ownerid;
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const initialValues = {
        username: "",
        email: "",
        password: "",
        idOwner: ownerId
    };

    const validationSchema = () => {
        return Yup.object().shape({
            username: Yup.string()
                .test(
                    "len",
                    "The username must be between 3 and 20 characters.",
                    (val: any) =>
                        val &&
                        val.toString().length >= 3 &&
                        val.toString().length <= 20
                )
                .required("This field is required!"),
            email: Yup.string()
                .email("This is not a valid email.")
                .required("This field is required!"),
            password: Yup.string()
                .test(
                    "len",
                    "The password must be between 6 and 40 characters.",
                    (val: any) =>
                        val &&
                        val.toString().length >= 6 &&
                        val.toString().length <= 40
                )
                .required("This field is required!"),
        });
    };

    const handleRegister = (formValue: { username: string; email: string; password: string; idOwner: string }) => {
        const { username, email, password, idOwner } = formValue;
        setMessage("");
        setSuccessful(false);
        console.log("idOwner is " + idOwner);
        AuthService.registerHelper(
            username,
            email,
            password,
            parseInt(idOwner),
        ).then(
            response => {
                setMessage(response.data.message);
                setSuccessful(true);
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    };

    //if (keysMatch("123",dkey || "")) {
    if (keysMatch("123","123")) {

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <h5>Monitor Register</h5>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <Field type="hidden" name="idOwner" className="form-control"/>
                                        <label htmlFor="username"> Username </label>
                                        <Field name="username" type="text" className="form-control"/>
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email"> Email </label>
                                        <Field name="email" type="email" className="form-control"/>
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password"> Password </label>
                                        <Field
                                            name="password"
                                            type="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    } else {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <div className="alert alert-warning" role="alert">
                        You are not authorized to register as an Monitor.
                    </div>
                </div>
            </div>
        );
    }
};

export default RegisterMonitor;
