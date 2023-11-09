import { Table } from 'reactstrap';

const NameDisplay = ({data}) => {
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
