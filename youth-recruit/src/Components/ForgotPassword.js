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
            {/* TODO: Create a Log In Page here */}
            {error}
            {message}
            <input type="email" ref={emailRef} required placeholder="Email"/>
            <button disabled={loading} type="submit" onClick={handleSubmit}>Reset Password</button>
            <Link to="/login">Log In</Link>
            <Link to="/signup/seekers">Sign Up</Link>
        </div>
    )
}
