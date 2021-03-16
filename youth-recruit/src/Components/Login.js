import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../Components/context/AuthContext";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to sign in");
        }

        setLoading(false);

    }

    function setStatus(event) {

    }

    return (
        <div className="container register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src="/assets/images/Youth-Recruit-Logo.jpeg" alt=""></img>
                    <h3>Youth Recruit</h3>
                    <p>Buckle up, You are about to start your Job search Journey with Youth Recruit!</p>
                    <p> Don't have an account ?</p>
                    {/* <a href="index.html" name="login" value="Login"> <button> Sign Up </button></a> <br> */}
                    <Link to="/signup/seekers">Sign Up</Link>
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
                <div className="col-md-9 register-right">
                    {error}
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 className="register-heading">Login to Youth Recruit</h3>
                            <form>
                                <div className="row register-form">
                                    <div className="col"> </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <div className="maxl" onChange={setStatus}>
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="male" />
                                                    <span> Job seeker </span>
                                                </label>
                                                <label className="radio inline">
                                                    <input type="radio" name="gender" value="female" />
                                                    <span> Recruiter </span>
                                            </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *" ref={emailRef} id="email" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *" ref={passwordRef} id="pass" required />
                                        </div>
                                        {/* <input type="submit" className="btnLogin" value="Login" /> */}
                                        <button className="btnLogin" disabled={loading} type="submit" onClick={handleSubmit}>Log In</button>
                                    </div>
                                    <div className="col"> </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // {/* // <div>
        // //     {error}
        // //     <input type="email" ref={emailRef} required placeholder="Email"/>
        // //     <input type="password" ref={passwordRef} required placeholder="Password" />
        // //     <button disabled={loading} type="submit" onClick={handleSubmit}>Log In</button>
        // //     <Link to="/signup/seekers">Sign Up</Link>
        // //     <Link to="/forgot-password">Forgot Password</Link>
        // // </div> */}
    )
}
