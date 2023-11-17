/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

import type React from 'react';
import { Table } from 'reactstrap';

// Define the type for the Javascript data input into the component
type Data = {
    id: number;
    name: string;
    item: object;
    index: number;
}

// Define the type of the props for the component
type Props = {
    data: Data[];
}
const NameDisplay: React.FC<Props> = ({ data }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default NameDisplay;
