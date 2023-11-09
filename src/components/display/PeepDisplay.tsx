import { Table } from 'reactstrap';

const PeepDisplay = ({ data }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.phone1}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default PeepDisplay;
