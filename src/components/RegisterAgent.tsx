import { useLocation } from 'react-router-dom';
import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

type Props = object; //{};

type State = {
    username: string,
    email: string,
    password: string,
    dkey: string,
    ownerid: number,
    successful: boolean,
    message: string
};

//const RegisterAgent = () => {

export default class RegisterAgent extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            dkey: "",
            ownerid: 0,
            successful: false,
            message: ""
        };
    }

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

    handleRegister(formValue: { username: string; email: string; password: string }) {
        const { username, email, password } = formValue;
        const query = new URLSearchParams(useLocation().search);
        let key = query.get('dkey');
        let id = query.get('ownerid');

        if (!key) {
            key = "123456";
        }

        if (!id) {
            id = "0";
        }

        this.setState({
            message: "",
            successful: false
        });

        AuthService.registerAgent(
            username,
            email,
            password,
            key,
            Number(id),
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
                    message: resMessage,
                });
            }
        );
    }

    render() {
        const { successful, message } = this.state;

        const initialValues = {
            username: "",
            email: "",
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
                    <h5>Agent Register</h5>
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
                    <p>{key}</p>
                </div>
            </div>
        );
    }
}