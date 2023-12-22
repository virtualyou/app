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

Home.tsx - landing page (component)
@author David L Whitehurst

*/

const Home = () => {

    return (
        <div className="jumbotron-fluid">
            <div className="container">
                <h1 className="display-3">Welcome!</h1>
                <p>
                    We host a productive application to serve every person with an internet-connected
                    device and a strong desire to organize their life. We aim to provide great value
                    for your time invested in your account at VirtualYou. And, this time should provide
                    you a return on your efforts. Remember, the view comes after the climb. As we
                    grow our feature base we expect that you will build yourself a living dataset
                    and a healthy VirtualYou.
                </p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>You</h2>
                        <p>VirtualYou.info will define you virtually in one easily accessible and convenient
                            application online. And, like every other application out there, we&rsquo;re
                            trying to win your loyalty and attention too. We do differ from the others
                            because we are going to allow all registered users (Owners) to assign one Agent
                            and one Monitor to their account.</p>
                    </div>
                    <div className="col-md-4">
                        <h2>Monitor</h2>
                        <p>The Monitor can login and see the Owner&rsquo;s data, however they are not
                            authorized to make any changes. A friend could check on a VirtualYou user or
                            even have a discussion on the phone using the application and be thousands of
                            miles away.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <h2>Agent</h2>
                        <p>The Agent will have rights to help edit the definition of their Owner&rsquo;s
                            account. The Agent is essentially an assistant to the Owner, e.g. an adult child
                            can help a parent with their monthly bills. A lawyer Agent might help a paying
                            client with their end-of-life affairs. A family care provider can help a
                            mentally ill parent with day to day activities or appointments.
                        </p>
                    </div>
                </div>
            </div>
            <p></p>
            <p></p>
            <div className="text-center">
                <p><a className="btn btn-primary btn-lg" href="pricing#/pricing" role="button">Sign up for Free!</a>
                </p>
            </div>
            <footer className="container">
                <p><img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="24"
                        height="24"/> &copy; VirtualYou and David L Whitehurst 2023</p>
            </footer>
        </div>
    );
};

export default Home;