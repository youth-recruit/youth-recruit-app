import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../Components/context/AuthContext";

export default function Signup() {
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
        <div>
            {/* TODO: Create a SignUp Page here */}
            {error}
            <input type="email" ref={emailRef} required placeholder="Email"/>
            <input type="password" ref={passwordRef} required placeholder="Password" />
            <input type="password" ref={passwordConfirmRef} required placeholder="Confirm Password" />
            <button disabled={loading} type="submit" onClick={handleSubmit}>Sign Up</button>
            <Link to="/login">Log In</Link>
        </div>
    )
}
