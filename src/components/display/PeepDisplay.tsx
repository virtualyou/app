/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import type React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

// Define the type for the Javascript data input into the component
type Data = {
    id: number;
    name: string;
    phone1: string;
    email: string;
    item: object;
    index: number;
}

// Define the type of the props for the component
type Props = {
    data: Data[];
}

const PeepDisplay: React.FC<Props> = ({ data }) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td><Link to={`/peeps?id=${item.id}`}>{item.id}</Link></td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone1}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default PeepDisplay;
