import AuthService from "../services/auth.service";
const user = AuthService.getCurrentUser();
const Profile = () => {

    return (
        <div className="jumbotron-fluid">
            <div className="container">
                <h1 className="display-3">Profile</h1>
                <p>Hello there <b>{user.username}</b></p>
            </div>
        </div>
    );
};

export default Profile;