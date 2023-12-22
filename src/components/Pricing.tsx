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

Pricing.tsx - Pricing (component)
@author David L Whitehurst

*/

//import AuthService from "../services/auth.service";
import './custom.css';
//import AuthService from "../services/auth.service.ts";
//import React, {useState} from "react";
//import {Link} from "react-router-dom";

const Pricing = () => {

    const myAlert = () => {
        alert("We are considering to allow the subscriber community to work with us to create new " +
            "entities for the product that will only be available to the Premier subscriber. Stay tuned!");
    }
    return (
        <div className="jumbotron-fluid">
            <div className="container">
                <h1 className="display-3">Pricing</h1>
                <p>
                    We suggest you register for the free signup because the first 1000 users will become lifetime
                    members. And, we greatly appreciate your feedback as we evolve our service product and build a
                    community of online assistance across America. Signup, try it out, and tell your friends and
                    family.
                </p>
            </div>
            <main>
                <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm border-primary">
                            <div className="card-header py-3 text-white bg-primary border-primary">
                                <h4 className="my-0 fw-normal">Free</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$0<small className="text-muted fw-light">/mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Owner, Agent, and Monitor included</li>
                                    <li>Lifetime subscription (first 1000)</li>
                                    <li>Email support</li>
                                    <li>Accepting feedback</li>
                                </ul>
                                <a className="w-100 btn btn-lg btn-outline-primary" href="index#/register" role="button">Sign Up Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">Owner (Inactive)</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$10<small className="text-muted fw-light">/mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Owner, Agent, and Monitor included</li>
                                    <li>Daily Backups</li>
                                    <li>Data Encryption</li>
                                    <li>Email Support</li>
                                    <li>Pending MVP Release</li>
                                </ul>
                                {/*<button type="button" className="w-100 btn btn-lg btn-primary">Get started</button>*/}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-4 rounded-3 shadow-sm">
                            <div className="card-header py-3">
                                <h4 className="my-0 fw-normal">Premier (Inactive)</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">$19<small className="text-muted fw-light">/mo</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>Owner, Agent, and Monitor included</li>
                                    <li>Daily Backups</li>
                                    <li>Data Encryption</li>
                                    <li>Additional Data Types</li>
                                    <li>Email Support</li>
                                    <li>Pending Version 1 Release</li>
                                </ul>
                                <button type="button" className="w-100 btn btn-lg btn-primary" onClick={myAlert}>More Info</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <p></p>
            <p></p>
            <footer className="container">
                <p><img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="24" height="24"/> &copy; VirtualYou and David L Whitehurst 2023</p>
            </footer>
        </div>
    );
};

export default Pricing;
