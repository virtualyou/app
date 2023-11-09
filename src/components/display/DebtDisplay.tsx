import { Table } from 'reactstrap';

const DebtDisplay = ({ data }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.balance}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default DebtDisplay;
