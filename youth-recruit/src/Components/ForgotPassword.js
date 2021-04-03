import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../Components/context/AuthContext";




export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setMessage("")
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your email for reseting Password")
        } catch {
            setError("Failed to reset Password");
        }

        setLoading(false);

    }

    return (
        <div>
            <div className="register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src="/assets/images/Youth-Recruit-Logo.png" alt=""></img>
                    <h3 className='name'><b>Youth Recruit</b></h3>
                    <p>Buckle up, You are about to start your Job search Journey with Youth Recruit!</p>
                    <p> Don't have an account ?</p>
                    {/* <a href="index.html" name="login" value="Login"> <button> Sign Up </button></a> <br> */}
                    <Link to="/signup/seekers"><button>Sign Up</button></Link>
                </div>
                <div className="col-md-9 register-right">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h3 className="register-heading">Reset password</h3>
                            <form>
                                <div className="row register-form">
                                    
                                    <div className="col"> </div>
                                    <div className="col-6">
                                    {error && (
                                        <div className = "error"><span>{error}</span></div>
                                    )}

                                    {message&& (
                                        <div className = "sucess"><span>{message}</span></div>
                                    )}
                                        <div className="form-group">
                                        <span>Enter your Email: </span>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *" ref={emailRef} id="email" required />
                                        </div>
                                        <button className="btnLogin" disabled={loading} type="submit" onClick={handleSubmit}>Reset Password</button>
                                    </div>
                                    <div className="col"> </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {/* TODO: Create a Log In Page here 
            {error}
            {message}
            <input type="email" ref={emailRef} required placeholder="Email"/>
            <button disabled={loading} type="submit" onClick={handleSubmit}>Reset Password</button>
            <Link to="/login">Log In</Link>
            <Link to="/signup/seekers">Sign Up</Link>*/}
        </div>
    )
}
