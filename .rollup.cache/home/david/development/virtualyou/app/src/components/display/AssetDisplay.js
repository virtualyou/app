import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
const AssetDisplay = ({ data }) => {
    return (_jsxs(Table, { striped: true, bordered: true, hover: true, size: "sm", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Id" }), _jsx("th", { children: "Name" }), _jsx("th", { children: "Balance" })] }) }), _jsx("tbody", { children: data.map((item, index) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx(Link, { to: `/assets?id=${item.id}`, children: item.id }) }), _jsx("td", { children: item.name }), _jsx("td", { children: item.balance })] }, index))) })] }));
};
export default AssetDisplay;
//# sourceMappingURL=AssetDisplay.js.map