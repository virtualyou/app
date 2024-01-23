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

BoardAdmin.tsx - Admin dashboard page (component)
@author David L Whitehurst

*/

import {useEffect, useState} from "react";
import UserService from "../services/user.service.ts";
import UserDisplay from "./display/UserDisplay.tsx";
import MemberDisplay from "./display/MemberDisplay.tsx";
import BusinessService from "../services/business.service.ts";

const BoardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        UserService.getAllUsers()
            .then((response) => {
                setUsers(response.data);
            })
    }, [])

    useEffect(() => {
        BusinessService.getAllMembers()
            .then((response) => {
                setMembers(response.data);
            })
    }, [])

    if (!users || !members) {
        return <div>Loading...</div>;
    }

  return (
      <div className="container">
          <header className="jumbotron">
              <h1 className="display-4">Admin Dashboard</h1>
              <p className="lead">This dashboard provides temporary key data.</p>
              <h3 className="font-weight-light">Users</h3>
              <UserDisplay data={users}/>
              <h3 className="font-weight-light">Members</h3>
              <MemberDisplay data={members}/>
          </header>
          <p></p>
          <p></p>
          <footer className="container">
              <p><img src="https://dlwhitehurst.com/vy.png" alt="brand icon" width="24"
                      height="24"/> &copy; VirtualYou and David L Whitehurst 2023</p>
          </footer>
      </div>
  );
};

export default BoardAdmin;
