/*
Copyright 2023 VirtualYou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Register.tsx - Owner registration (component)
@author David L Whitehurst

*/

import {Component} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import HcaptchaComponent from "./HcaptchaComponent.tsx";

import AuthService from "../services/auth.service";

interface Props {
    // Define the props that your component expects
}

type State = {
    username: string,
    email: string,
    fullname: string,
    password: string,
    successful: boolean,
    message: string
};

export default class Register extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            fullname: "",
            successful: false,
            message: "",
        };
    }


    private siteKey = import.meta.env.VITE_SITE_KEY;

    validationSchema() {
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
            fullname: Yup.string()
                .test(
                    "len",
                    "The fullname must be between 4 and 32 characters",
                    (val: any) =>
                        val &&
                        val.toString().length >= 4 &&
                        val.toString().length <= 32
                )
                .required("This field is required"),
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
    }

    handleRegister(formValue: { username: string; email: string; fullname: string; password: string }) {
        const { username, email, fullname, password } = formValue;

        this.setState({
            message: "",
            successful: false
        });

        AuthService.register(
            username,
            email,
            fullname,
            password,
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        const { successful, message } = this.state;

        const initialValues = {
            username: "",
            email: "",
            fullname: "",
            password: "",
        };

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleRegister}
                    >
                        <Form>
                            {!successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username"> Username </label>
                                        <Field name="username" type="text" className="form-control" />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="fullname"> Fullname </label>
                                        <Field name="fullname" type="text" className="form-control" />
                                        <ErrorMessage
                                            name="fullname"
                                            component="div"
                                            className="alert alert-danger"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email"> Email </label>
                                        <Field name="email" type="email" className="form-control" />
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
                                    <div>
                                        {/* Your page content */}
                                        <HcaptchaComponent sitekey={this.siteKey} />
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
    }
}