import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import "./signup.css";
import SignupIntro from './SignupIntro';

export default function Signup() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const companyNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match!");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch {
            setError("Failed to create a account");
        }

        setLoading(false);

    }

    return (
        <div className="container register">
            <div className="row">
                <SignupIntro />
                <div className="col-md-9 register-right">
                    {error}
                    <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                        <li className="nav-item">
                            <Link className="nav-link" id="seekers-tab" to="/signup/seekers">Job Seeker</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" id="recruiters-tab" to="/signup/recruiters">Recruiters</Link>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="recruiters">
                            <h3 className="register-heading">Apply as a Hirer</h3>
                            <form>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="First Name *" ref={firstNameRef} id="Hfirst-Name" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Last Name *" ref={lastNameRef} id="Hlast-name" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *" ref={emailRef} id="Hemail" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" maxLength="10" minLength="10" className="form-control" placeholder="Phone" ref={phoneRef} id="Hphone" />
                                        </div>


                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password *" ref={passwordRef} id="Hpassword" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Confirm Password *" ref={passwordConfirmRef} id="Hconfirm-pass" required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Company Name" ref={companyNameRef} id="company-name" required />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control">
                                            <option className="hidden" selected="" disabled="">Company Location</option>
                                            <option>Dubai</option>
                                            <option>Sharjah</option>
                                            <option>Abu Dhabi</option>
                                        </select>
                                        </div>

                                        {/* <input type="submit" className="btnRegister" value="Register" id="registerH" /> */}
                                        <button className="btnRegister" disabled={loading} type="submit" onClick={handleSubmit}>Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // {/* // <div>
        // //     TODO: Create a SignUp Page here
        // //     {error}
        // //     <input type="email" ref={emailRef} required placeholder="Email"/>
        // //     <input type="password" ref={passwordRef} required placeholder="Password" />
        // //     <input type="password" ref={passwordConfirmRef} required placeholder="Confirm Password" />
        // //     <button disabled={loading} type="submit" onClick={handleSubmit}>Sign Up</button>
        // //     <Link to="/login">Log In</Link>
        // // </div> */}
    )
}
