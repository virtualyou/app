import { Table } from 'reactstrap';

const PrescriptionDisplay = ({ data }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>RxUnit</th>
                <th>Note</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.rxUnit}</td>
                    <td>{item.note}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default PrescriptionDisplay;
