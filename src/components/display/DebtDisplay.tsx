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
    payment: string;
    item: object;
    index: number;
}

// Define the type of the props for the component
type Props = {
    data: Data[];
}
const DebtDisplay: React.FC<Props> = ({ data }) => {
    return (
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Payment</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td><Link to={`/debts?id=${item.id}`}>{item.id}</Link></td>
                    <td>{item.name}</td>
                    <td>{item.payment}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default DebtDisplay;
