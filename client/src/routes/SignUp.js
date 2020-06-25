import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css';
import { emailRegex } from './../util/validation';
import { POST } from "./../util/methods";

const SignUp = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function signUp() {
        if (!emailRegex.test(email)) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" });
            return;
        }
    
        let data = await POST("/signup", {
            name,
            email,
            password
        })
    
        if (data.err) {
            M.toast({ html: data.err, classes: "#c62828 red darken-3" });
        }
        else {
            M.toast({ html: data.message, classes: "#43a047 green darken-1" });
            history.push("/signin");
        }
    }
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    onClick={async () => { await signUp()}}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                >
                    Sign Up
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    );
}

export default SignUp;