/**
 * VirtualYou
 * @license Apache-2.0
 * @author David L Whitehurst
 */

export default function authHeader() {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);

    if (user && user.token) {
        //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        return {
            'x-access-token': user.token,
            'Access-Control-Allow-Origin': '*'
        };       // for Node.js Express back-end
    } else {
        //return { Authorization: '' }; // for Spring Boot back-end
        return { 'x-access-token': null }; // for Node Express back-end
    }
}