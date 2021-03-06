import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { emailRegex } from "./../util/validation";
import { POST } from "./../util/methods";
import M from "materialize-css";
import { UserContext } from "./../App";

const SignIn = () => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { dispatch } = useContext(UserContext);

    async function signIn() {
        if (!emailRegex.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
            return;
        }

        let data = await POST("/signin", {
            email,
            password,
        });

        if (data.err) {
            M.toast({ html: data.err, classes: "#c62828 red darken-3" });
        } else {
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({ type: "USER", payload: data.user });
            M.toast({
                html: "Login successfull.",
                classes: "#43a047 green darken-1",
            });
            history.push("/");
        }
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={async () => {
                        await signIn();
                    }}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    );
};

export default SignIn;
