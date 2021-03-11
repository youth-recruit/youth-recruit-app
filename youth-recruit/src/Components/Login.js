import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../Components/context/AuthContext";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
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
            <button disabled={loading} type="submit" onClick={handleSubmit}>Log In</button>
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}
