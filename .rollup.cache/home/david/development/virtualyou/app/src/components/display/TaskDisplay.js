import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './custom.css';
const DebtDisplay = ({ data }) => {
    return (_jsxs(Table, { striped: true, bordered: true, hover: true, size: "sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Id" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Due" }), _jsx("th", { children: "Note" })] }) }), _jsx("tbody", { children: data.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx(Link, { to: `/tasks?id=${item.id}`, children: item.id }) }), _jsx("td", { children: item.name }), _jsx("td", { children: item.type }), _jsx("td", { children: item.due }), _jsx("td", { children: item.note })] }, index))) })] }));
};
export default DebtDisplay;
//# sourceMappingURL=TaskDisplay.js.map