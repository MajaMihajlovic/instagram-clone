import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./../App";

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    
    const renderList = () => {
        console.log("state" + state);

        if (state) {
            return [
                <li>
                    <Link to="/">Home</Link>
                </li>,
                <li>
                    <Link to="/profile">Profile</Link>
                </li>,
                <li>
                    <Link to="/create">Create Post</Link>
                </li>,
                <li>
                    <button
                        className="btn #c62828 red darken-3"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" });
                            history.push("/");
                        }}
                    >
                        Logout
                    </button>
                </li>,
            ];
        } else {
            return [
                <li>
                    <Link to="/signin">Login</Link>
                </li>,
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>,
            ];
        }
    };
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/signin"} className="brand-logo left" style={{ paddingLeft: "10px" }}>
                    Instagram
                </Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
