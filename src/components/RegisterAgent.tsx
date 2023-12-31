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

RegisterAgent.tsx - Agent registration (component)
@author David L Whitehurst

*/

import { useLocation } from 'react-router-dom';
import {keysMatchForAgent} from "../utility/key.utils.ts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import AuthService from "../services/auth.service.ts"
import UserService from "../services/user.service.ts";
import { useState, useEffect } from "react";
import * as Yup from "yup";

const RegisterAgent = () => {
    const query = new URLSearchParams(useLocation().search);
    const dkey = query.get('dkey');
    const altId = query.get('ownerid');
    const [ownerId, setOwnerId] = useState(new URLSearchParams(useLocation().search).get('ownerid'));
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [decision, setDecision] = useState<boolean | null>(null);

    useEffect(() => {
        keysMatchForAgent(parseInt(altId || "0"), dkey || "").then(setDecision);
    }, []);

    if (!ownerId) {
        setOwnerId("0");
    }

    interface Values {
        username: string,
        fullname: string,
        email: string,
        password: string,
        idOwner: any
    }

    const initialValues: Values = {
        username: "",
        email: "",
        fullname: "",
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
    };

    const handleRegister = async (formValue: { username: string; email: string; fullname: string; password: string; idOwner: string }) => {
        const { username, email, fullname, password, idOwner } = formValue;
        setMessage("");
        setSuccessful(false);

        // signup as agent
        AuthService.registerHelper(
            username,
            email,
            fullname,
            password,
            0,
            parseInt(idOwner),
            0,
            "agent"
        ).then(
            response => {
                setMessage(response.data.message);
                setSuccessful(true);
                UserService.getAgentWhereOwnerId(parseInt(idOwner)).then(
                    response => {
                        UserService.setAgentIdForOwner(response.data.id, parseInt(idOwner));
                    }
                );
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

    if (decision === null) {
        return <div>Loading ...</div>
    }

    if (decision) {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <h5>Agent Register</h5>
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
                        You are not authorized to register as an Agent.
                    </div>
                </div>
            </div>
        );
    }
};

export default RegisterAgent;
