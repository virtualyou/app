import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */
import AuthService from "../services/auth.service";
import './custom.css';
import { Link } from "react-router-dom";
const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    return (_jsx("div", { className: "container", children: _jsxs("header", { className: "jumbotron", children: [_jsxs("h3", { children: [_jsx("strong", { children: currentUser.username }), " Profile"] }), _jsxs("div", { className: "comp-div", children: [_jsxs("p", { children: [_jsx("strong", { children: "Id:" }), " ", currentUser.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Email:" }), " ", currentUser.email] }), _jsx("strong", { children: "Authorities:" }), _jsx("ul", { children: currentUser.roles &&
                                currentUser.roles.map((role, index) => _jsx("li", { children: role }, index)) })] }), _jsx("h5", { children: "Let's Get Started" }), _jsx("p", { children: "Links are provided here to get started building your digital self and keeping your vital information in one place and up to date. The Dashboard is used to show on-going activity and also reminders for things that need attention." }), _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: `/financial`, children: "Financial" }) }), _jsx("li", { children: _jsx(Link, { to: `/medical`, children: "Medical" }) }), _jsx("li", { children: _jsx(Link, { to: `/legal`, children: "Legal" }) }), _jsx("li", { children: _jsx(Link, { to: `/administration`, children: "Administration" }) }), _jsx("li", { children: _jsx(Link, { to: `/personal`, children: "Personal" }) })] })] }) }));
};
export default Profile;
//# sourceMappingURL=Profile.js.map