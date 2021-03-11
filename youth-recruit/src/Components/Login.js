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

    return (
        <div>
            {/* TODO: Create a Log In Page here */}
            {error}
            <input type="email" ref={emailRef} required placeholder="Email"/>
            <input type="password" ref={passwordRef} required placeholder="Password" />
            <button disabled={loading} type="submit" onClick={handleSubmit}>Log In</button>
            <Link to="/signup">Sign Up</Link>
            <Link to="/forgot-password">Forgot Password</Link>
        </div>
    )
}
