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

NeedDisplay.tsx - Table listing Needs
@author David L Whitehurst

*/

import type React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './custom.css';

// Define the type for the Javascript data input into the component
type Data = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    urgency: string;
    note: string;
    userKey: number
}

// Define the type of the props for the component
type Props = {
    data: Data[];
}
const NeedDisplay: React.FC<Props> = ({ data }) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Urgency</th>
                <th>Note</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td><Link to={`/needs?id=${item.id}`}>{item.id}</Link></td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.urgency}</td>
                    <td>{item.note}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default NeedDisplay;
